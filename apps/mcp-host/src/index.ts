import { serve } from '@hono/node-server';
import { app } from './app.js';

const port = Number(process.env.PORT) || 3000;

serve({ fetch: app.fetch, port });

console.log(`mp-mcp host running at http://localhost:${port}`);
