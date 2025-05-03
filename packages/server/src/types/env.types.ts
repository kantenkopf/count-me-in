export type EnvMode = 'dev' | 'prod';

export type EnvArgs = {
  PORT: number;
  NODE_ENV: EnvMode;
  CLIENT_URL?: string;
};

//Guards
export const isValidEnvMode = (val: string): val is EnvMode => {
  return ['dev', 'prod'].includes(val);
};
