import fastify from 'fastify';
import closeWithGrace from 'close-with-grace';
import app, { options } from './app';

const DEFAULT_PORT = 3001;

// Instantiate Fastify with some config
const server = fastify({
  logger: {
    level: 'info',
  },
  ...options,
});

server.register(app);
// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace({ delay: 500 }, async ({ err }: any) => {
  if (err) {
    server.log.error(err);
  }
  await server.close();
});

server.addHook('onClose', (_, done) => {
  closeListeners.uninstall();
  done();
});

// Start listening.
// use 0.0.0.0 for docker
server.listen(
  {
    host: '0.0.0.0',
    port: DEFAULT_PORT,
  },
  (err) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
  }
);
