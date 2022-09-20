type APP_ENV_TYPE = 'local' | 'test' | 'dev' | 'prod';
export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV as APP_ENV_TYPE;

export const IS_SERVER = typeof window === 'undefined';
