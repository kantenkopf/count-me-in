process.env.TEST = 'enabled';
process.env.NODE_ENV = 'prod';

import request from 'supertest';
import app from '../src/index';
import path from 'path';

jest.mock('path', () => ({
  ...jest.requireActual('path'),
  resolve: jest.fn(() => '/mocked/client'),
  join: jest.fn(() => '/mocked/client/index.html'),
}));

describe('Server in Production Mode', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'prod';
  });

  it('should serve static content', async () => {
    // Mock the behavior of `res.sendFile` at the route level
    const mockSendFile = jest.fn((filePath, callback) => {
      if (filePath === '/mocked/client/index.html') {
        callback(null); // Simulate successful file serving
      } else {
        callback(new Error('File not found'));
      }
    });

    app.use((req, res, next) => {
      res.sendFile = mockSendFile; // Override `sendFile` for testing
      next();
    });

    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(mockSendFile).toHaveBeenCalledWith(
      '/mocked/client/index.html',
      expect.any(Function)
    );
  });

  it('should handle errors when serving index.html', async () => {
    // Mock the behavior of `res.sendFile` to simulate an error
    const mockSendFile = jest.fn((_, callback) => {
      callback(new Error('Test Error')); // Simulate an error
    });

    app.use((req, res, next) => {
      res.sendFile = mockSendFile; // Override `sendFile` for testing
      next();
    });

    const response = await request(app).get('/');
    expect(response.status).toBe(500);
    expect(response.text).toBe('Internal Server Error');
    expect(mockSendFile).toHaveBeenCalledWith(
      '/mocked/client/index.html',
      expect.any(Function)
    );
  });
});