process.env.NODE_ENV = 'prod';
process.env.TEST = 'enabled';

import path from 'path';
import request from 'supertest';
import app from '../src/index';

jest.mock('path', () => {
  const originalPath = jest.requireActual('path');
  return {
    ...originalPath,
    resolve: jest.fn((...args) => {
      if (args.length > 1 && args[1] === 'client') {
        return '/mock/dist/client';
      }
      return originalPath.resolve(...args);
    }),
    join: jest.fn((...args) => {
       if (args.length > 1 && args[1] === 'index.html') {
         return '/mock/dist/client/index.html';
       }
       return originalPath.join(...args);
    }),
  };
});

const originalConsoleError = console.error;

describe('Server in Production Mode', () => {
  let errorSpy: jest.SpyInstance;

  it('should resolve the client dist path on startup', () => {
    expect(path.resolve).toHaveBeenCalledWith(expect.any(String), 'client');
  });

  beforeEach(() => {
    (path.join as jest.Mock).mockClear();
    if (errorSpy) {
        errorSpy.mockClear();
    } else {
        errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    }
  });

  afterAll(() => {
    console.error = originalConsoleError;
    jest.restoreAllMocks();
  });

  it('should attempt to serve index.html for arbitrary routes and fail (mocked)', async () => {
    const response = await request(app).get('/some/non-existent/route');

    expect(path.join).toHaveBeenCalledWith('/mock/dist/client', 'index.html');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Internal Server Error');
    expect(errorSpy).toHaveBeenCalled();
  });

  it('should attempt static file serving and fallback for non-existent static file', async () => {
    const response = await request(app).get('/main.js');

    expect(path.join).toHaveBeenCalledWith('/mock/dist/client', 'index.html');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Internal Server Error');
    expect(errorSpy).toHaveBeenCalled();
  });
});