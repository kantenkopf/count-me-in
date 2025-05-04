import { getEnvArgs } from 'src/helpers/argv.helper';

describe('getEnvArgs', () => {
  it('should return default values when no arguments are provided', () => {
    const argv = ['node', 'script.js'];
    const envArgs = getEnvArgs(argv);

    expect(envArgs).toEqual({
      PORT: 3000,
      NODE_ENV: 'dev',
      CLIENT_URL: 'http://localhost:8080',
    });
  });

  it('should override PORT when provided', () => {
    const argv = ['node', 'script.js', 'PORT=8080'];
    const envArgs = getEnvArgs(argv);

    expect(envArgs.PORT).toBe(8080);
  });

  it('should override NODE_ENV when a valid value is provided', () => {
    const argv = ['node', 'script.js', 'NODE_ENV=prod'];
    const envArgs = getEnvArgs(argv);

    expect(envArgs.NODE_ENV).toBe('prod');
    expect(envArgs.CLIENT_URL).toBeUndefined(); // CLIENT_URL should be unset in prod
  });

  it('should not override NODE_ENV when an invalid value is provided', () => {
    const argv = ['node', 'script.js', 'NODE_ENV=invalid'];
    const envArgs = getEnvArgs(argv);

    expect(envArgs.NODE_ENV).toBe('dev'); // Default value
    expect(envArgs.CLIENT_URL).toBe('http://localhost:8080'); // Default value
  });

  it('should override CLIENT_URL when in dev mode and valid localhost URL is provided', () => {
    const argv = ['node', 'script.js', 'CLIENT_URL=http://localhost:3000'];
    const envArgs = getEnvArgs(argv);

    expect(envArgs.CLIENT_URL).toBe('http://localhost:3000');
  });

  it('should throw an error when CLIENT_URL is invalid in dev mode', () => {
    const argv = ['node', 'script.js', 'CLIENT_URL=http://example.com'];

    expect(() => getEnvArgs(argv)).toThrow(
      'Invalid CLIENT_URL: CLIENT_URL is restricted to localhost in dev mode.'
    );
  });

  it('should ignore CLIENT_URL in prod mode', () => {
    const argv = [
      'node',
      'script.js',
      'NODE_ENV=prod',
      'CLIENT_URL=http://localhost:3000',
    ];
    const envArgs = getEnvArgs(argv);

    expect(envArgs.NODE_ENV).toBe('prod');
    expect(envArgs.CLIENT_URL).toBeUndefined(); // CLIENT_URL should be unset in prod
  });

  it('should handle multiple arguments correctly', () => {
    const argv = [
      'node',
      'script.js',
      'PORT=5000',
      'NODE_ENV=dev',
      'CLIENT_URL=http://localhost:4000',
    ];
    const envArgs = getEnvArgs(argv);

    expect(envArgs).toEqual({
      PORT: 5000,
      NODE_ENV: 'dev',
      CLIENT_URL: 'http://localhost:4000',
    });
  });
});
