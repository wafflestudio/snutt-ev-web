import { IS_SERVER } from '@/utils/env';

async function initMocks() {
  if (IS_SERVER) {
    const { server } = await import('./integrations/server');
    server.listen();
    console.log('server worker started');
  } else {
    const { worker } = await import('./integrations/browser');
    worker.start({ onUnhandledRequest: 'bypass' });
    console.debug('browser worker started');
  }
}

initMocks();

export {};
