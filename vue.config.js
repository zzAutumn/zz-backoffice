const webpack = require('webpack');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/zz-backoffice/' : '/',
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
