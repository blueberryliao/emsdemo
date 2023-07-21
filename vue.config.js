module.exports = {
  lintOnSave: false,

  devServer: {
    port: "10086",
    host: "localhost",
    proxy: {
      // "/": {
      //   // target: "http://10.0.6.31:8083",
      //   target: "http://36.41.69.47:8083/",
      //   changeOrigin: true,
      //   pathRewrite: { "^/": "" },
      // },
      [process.env.VUE_APP_BASE_API]: {
        target: "http://36.41.69.47:8083",
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
    },
  },
};
