const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // The endpoint you want to proxy (e.g., /api/github)
    createProxyMiddleware({
      target: 'https://api.github.com', // The target URL of the API
      changeOrigin: true,
    })
  );
};