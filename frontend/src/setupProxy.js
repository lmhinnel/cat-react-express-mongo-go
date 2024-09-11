const { legacyCreateProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/be",
    legacyCreateProxyMiddleware({
      target: "http://backend:3000",
      changeOrigin: true,
    })
  );
  app.use(
    "/v1/traces",
    legacyCreateProxyMiddleware({
      target: "http://jaeger:4318",
      changeOrigin: true,
    })
  );
};
