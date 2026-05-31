// The Anthropic SDK's `beta` namespace eagerly imports its Node-only agent-toolset /
// sessions code (node:fs, node:child_process, …) which we never call from the browser.
// The SDK ships no browser build, so we stub those Node core modules out of the client
// bundle. Webpack's `resolve.fallback: false` is the robust mechanism for this (it
// tolerates the SDK's named imports); hence the app runs on `--webpack`, not Turbopack.
const NODE_CORE = [
  'buffer',
  'child_process',
  'crypto',
  'fs',
  'fs/promises',
  'path',
  'readline',
  'stream',
  'stream/promises',
  'util',
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['mp-mcp'],
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // `node:`-prefixed imports are a URI scheme resolved before aliasing; strip the
      // prefix so they become bare requests the rules below can catch. Client only —
      // the server keeps real Node core.
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
          resource.request = resource.request.replace(/^node:/, '');
        }),
      );
      // Alias each bare name (and, by prefix, its subpaths e.g. stream/promises) to an
      // empty module. Alias beats Next's default browser polyfills for stream/crypto/…,
      // which otherwise mis-resolve those subpaths. fallback is the belt-and-suspenders
      // path for anything an alias prefix misses.
      config.resolve.alias = {
        ...config.resolve.alias,
        ...Object.fromEntries(NODE_CORE.map((m) => [m, false])),
      };
      config.resolve.fallback = {
        ...config.resolve.fallback,
        ...Object.fromEntries(NODE_CORE.map((m) => [m, false])),
      };
    }
    return config;
  },
};

export default nextConfig;
