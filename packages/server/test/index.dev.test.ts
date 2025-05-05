process.env.TEST = 'enabled';
process.env.NODE_ENV = 'dev';

import request from 'supertest';
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from '../src/index';

jest.mock('socket.io', () => {
  const mockNamespace = {
    on: jest.fn(),
    emit: jest.fn(),
  };

  const mockServer = {
    of: jest.fn(() => mockNamespace),
  };

  return {
    Server: jest.fn(() => mockServer),
    Namespace: jest.fn(),
    Socket: jest.fn(),
  };
});

jest.mock('path', () => ({
  ...jest.requireActual('path'),
  resolve: jest.fn(() => '/mocked/client'),
  join: jest.fn(() => '/mocked/client/index.html'),
}));

describe('Server in Development Mode', () => {
  it('should not serve static content', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(404);
  });

  it('should initialize the socket.io server', () => {
    const mockIo = new Server(createServer());
    expect(mockIo).toBeDefined();
  });
});