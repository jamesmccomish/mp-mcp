import pino from 'pino';
import { loadConfig } from '../config.js';

const config = loadConfig();

export const logger = pino(
  {
    name: 'mp-mcp',
    level: config.logLevel,
  },
  pino.destination(2),
);

export type Logger = typeof logger;
