import { EnvArgs, isValidEnvMode } from 'src/types/env.types';

const isLocalhost = (url: string): boolean => {
  const pattern = /^https?:\/\/localhost(:\d+)?(\/.*)?$/;
  return pattern.test(url);
};

export const getEnvArgs = (argv: string[]): EnvArgs => {
  const envArgs: EnvArgs = {
    PORT: 3000,
    NODE_ENV: 'dev',
    CLIENT_URL: 'http://localhost:8080',
  };

  for (const arg of argv.slice(2, argv.length)) {
    const splitArg = arg.split('=');

    const key = splitArg[0];
    const value = splitArg[1];

    //CLIENT_URL is unset unless in 'dev' mode to avoid accidentally enabling CORS in production.
    if (key === 'PORT') {
      envArgs.PORT = Number(value);
    } else if (key === 'NODE_ENV' && isValidEnvMode(value)) {
      if (value === 'dev') {
        envArgs.NODE_ENV = value;
      } else {
        envArgs.NODE_ENV = value;
        envArgs.CLIENT_URL = undefined;
      }
    }
    if (key === 'CLIENT_URL' && envArgs.CLIENT_URL !== undefined) {
      if (isLocalhost(value)) {
        envArgs.CLIENT_URL = value;
      } else {
        throw new Error(
          'Invalid CLIENT_URL: CLIENT_URL is restricted to localhost in dev mode.'
        );
      }
    }
  }

  return envArgs;
};
