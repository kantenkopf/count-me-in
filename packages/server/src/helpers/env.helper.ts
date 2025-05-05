import { EnvArgs, isValidEnvMode } from "@/types/env.types";


const isLocalhost = (url: string): boolean => {
  const pattern = /^https?:\/\/localhost(:\d+)?(\/.*)?$/;
  return pattern.test(url);
};

export const getEnvArgs = (): EnvArgs => {
  const envArgs: EnvArgs = {
    PORT: 3000,
    NODE_ENV: 'dev',
    CLIENT_URL: 'http://localhost:8080',
  };

  const { PORT, NODE_ENV, CLIENT_URL } = process.env;

  if (PORT !== null && PORT !== undefined) {
    envArgs.PORT = Number(PORT);
  }

  if (NODE_ENV !== null && NODE_ENV !== undefined) {
    if (isValidEnvMode(NODE_ENV)) {
      if (NODE_ENV === 'prod') {
        envArgs.NODE_ENV = NODE_ENV;
        envArgs.CLIENT_URL = undefined;
      } else {
        envArgs.NODE_ENV = NODE_ENV;
      }
    } else {
      throw new Error('Invalid mode for server. Only dev and prod are supported.')
    }
  }

  if (CLIENT_URL !== null && CLIENT_URL !== undefined) {
    if (envArgs.NODE_ENV === 'dev') {
      if (isLocalhost(CLIENT_URL)) envArgs.CLIENT_URL = CLIENT_URL;
      else throw new Error('CLIENT_URL is restricted to localhost.')
    } else {
      console.log('CLIENT_URL is restricted to dev mode. Skipping env parameter.')
    }
  }
  
  return envArgs;
};
