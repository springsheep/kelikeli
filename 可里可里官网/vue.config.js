const dev = false;
module.exports = {
  publicPath: '',
  lintOnSave: true,
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    open: process.platform === "darwin",
    host: "localhost",
    port: "8080",
    https: false,
    hotOnly: false,
    proxy: {
      "/demo": {
        target: dev ? "https://www.kelibbb.com" : "https://www.kelibbb.com",
        changeOrigin: true,
        pathRewirte: {
          "^/demo": "/demo"
        }
      }
    },
    before: app => {
    }
  },
};
