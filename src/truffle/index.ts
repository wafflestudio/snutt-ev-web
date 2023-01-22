import { APP_ENV, IS_SERVER } from '@/utils/env';

export interface TruffleClient {
  capture(message: Error): void;
}

const baseUrl = 'https://truffle-api.wafflestudio.com';
const apiKey = 'abcdef';
const runtime = IS_SERVER ? { name: 'nodejs', version: process.versions.node } : { name: 'browser', version: '' };
const enabled = process.env.NODE_ENV === 'production';

const getTruffleClient = (): TruffleClient => {
  return {
    capture: (error: Error) => {
      const message = error.message;
      const elements = error.stack
        ?.split('\n')
        .filter((s) => s.includes('at '))
        .map((str) => ({
          className: '',
          methodName: str.split(' ')[5],
          lineNumber: Number(str.split(' ')[6].slice(1, -1).split(':').at(-2)),
          fileName: str.split(' ')[6].slice(1, -1).split(':').slice(0, -2).join(':'),
          isInAppInClude: true,
        }));
      const body = {
        version: 'v1',
        app: { name: 'snutt-ev-web', phase: APP_ENV },
        runtime,
        exception: { className: error.name, message, elements },
      };

      if (!enabled) {
        console.log(JSON.stringify(body));
        return;
      }

      fetch(`${baseUrl}/events`, {
        method: 'POST',
        headers: { 'x-api-key': apiKey, 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
    },
  };
};

export const truffleClient = getTruffleClient();
