import { logger } from '@fcos/observability';

logger.info('worker.starting', { pid: process.pid });

process.on('SIGTERM', () => {
  logger.info('worker.shutdown');
  process.exit(0);
});
