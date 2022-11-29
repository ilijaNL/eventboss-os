import fp from 'fastify-plugin';
import PgBoss from 'pg-boss';

declare module 'fastify' {
  interface FastifyInstance {
    pg_boss: PgBoss;
  }
}

const pgBoss = fp<{ options: PgBoss.ConstructorOptions }>(async (fastify, options) => {
  const boss = new PgBoss(options.options);
  boss.on('error', (error) => fastify.log.error(error));
  await boss.start();

  fastify.decorate('pg_boss', boss);

  fastify.addHook('onClose', async () => {
    await boss.stop({ graceful: true, timeout: 3000 });
  });
});

export default pgBoss;
