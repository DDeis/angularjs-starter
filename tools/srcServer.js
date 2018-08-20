// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// This file configures the development web server
// which supports hot reloading and synchronized testing.

// Require Browsersync along with webpack and middleware for it
const browserSync = require('browser-sync');
// Required for react-router browserHistory
// see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
const historyApiFallback = require('connect-history-api-fallback');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxy = require('http-proxy-middleware');
const path = require('path');
const fs = require('fs');

const config = require('../config/webpack.config.dev');

const bundler = webpack(config);

let middleware = [
  historyApiFallback(),

  webpackDevMiddleware(bundler, {
    // Dev middleware can't access config, so we provide publicPath
    publicPath: config.output.publicPath,

    // These settings suppress noisy webpack output so only errors are displayed to the console.
    noInfo: true,
    quiet: false,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      modules: false,
      entrypoints: false,
      chunks: false,
      chunkModules: false,
    },

    // for other settings see
    // https://webpack.js.org/guides/development/#using-webpack-dev-middleware
  }),

  // bundler should be the same as above
  webpackHotMiddleware(bundler),
];

const appDirectory = fs.realpathSync(process.cwd());
const proxyConfigPath = path.resolve(appDirectory, 'config', 'proxy.conf.js');
if (fs.existsSync(proxyConfigPath)) {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const proxies = Object.entries(require(proxyConfigPath)).map(
    ([context, options]) => proxy(context, options),
  );
  middleware = [...middleware, ...proxies];
} else if (process.env.PROXY_URL) {
  middleware = [
    ...middleware,
    proxy({
      target: process.env.PROXY_URL, // target host
      changeOrigin: true, // needed for virtual hosted sites
      ws: true, // proxy websockets
    }),
  ];
}

let shouldOpenBrowser = 'local';
if (process.env.BROWSER) {
  // eslint-disable-next-line operator-linebreak
  shouldOpenBrowser =
    process.env.BROWSER === 'false' ? false : process.env.BROWSER;
}

const browserSyncConfig = {
  open: shouldOpenBrowser,
  port: parseInt(process.env.PORT, 10) || 3000,
  ui: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) + 100 : 3100,
  },
  server: {
    baseDir: 'src',

    middleware,
  },

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: ['src/*.html'],
};

// Run Browsersync and use middleware for Hot Module Replacement
browserSync(browserSyncConfig);
