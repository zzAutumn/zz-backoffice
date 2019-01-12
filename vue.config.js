const webpack = require('webpack');

module.exports = {
  devServer: {
    port: 8000,
    proxy: {
      '/zzautumn': {
        target: 'http://localhost:8080/',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/zzautumn': '/zzautumn',
        },
        secure: false,
      },
    },
    overlay: {
      warnings: false,
      errors: false,
    },
  },
  configureWebpack: {
    plugins: [

    ],
  },
};
