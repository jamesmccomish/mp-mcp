import { app } from '../src/app.js';

// Vercel's Node runtime natively supports the `fetch` Web Standard export, which
// a Hono app is: https://vercel.com/docs/functions/runtimes/node-js. Vercel hands
// the function the untouched Web Request and streams the Web Response back, so
// there is no IncomingMessage/ServerResponse bridging and — crucially — no
// pre-parsed `req.body` draining the stream the MCP transport needs to read.
export default app;
