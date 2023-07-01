// const { defineConfig } = require("@vue/cli-service");

// const path = require("path");
// function resolve(dir) {
//   return path.join(__dirname, dir);
// }

// const name = process.env.VUE_APP_TITLE || "海外选举管理系统"; // 网页标题
// const port = process.env.port || process.env.npm_config_port || 80; // 端口
// const path = require("path");
// const fs = require("fs");
// const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

// const port = process.env.port || process.env.npm_config_port || 80; // 端口

// function getPlugin() {
//   let plugins = [];
//   if (process.env.NODE_ENV !== "production") return plugins;
//   const files = fs.readdirSync(path.resolve(__dirname, "./dll"));
//   files.forEach((file) => {
//     if (/.*\.dll.js/.test(file)) {
//       plugins.push(
//         new AddAssetHtmlWebpackPlugin({
//           filepath: path.resolve(__dirname, "./dll", file),
//         })
//       );
//     }
//     if (/.*\.manifest.json/.test(file)) {
//       plugins.push(
//         new DllReferencePlugin({
//           manifest: path.resolve(__dirname, "./dll", file),
//         })
//       );
//     }
//   });
//   return plugins;
// }
// module.exports = {
//   css: {
//     loaderOptions: {
//       // 给 sass-loader 传递选项
//       // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
//       // 因为 `scss` 语法在内部也是由 sass-loader 处理的
//       // 但是在配置 `prependData` 选项的时候
//       // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
//       // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
//       scss: {
//         prependData: `@import "~@/assets/style/element-variables";`,
//       },
//     },
//   },
//   chainWebpack: (config) => {
//     config.plugin("html").tap((args) => {
//       const params = args[0];
//       params.title = "海外选举系统";
//       return [params];
//     });
//     config.module
//       .rule("js")
//       .exclude.add(path.resolve(__dirname, "./lib"))
//       .end();
//     config.module
//       .rule(".css")
//       .exclude.add(path.resolve(__dirname, "./lib"))
//       .end();
//   },
//   configureWebpack: {
//     plugins: [
//       ...getPlugin(),
//       new CopyPlugin([
//         {
//           from: path.resolve(__dirname, "./lib"),
//           to: path.resolve(__dirname, "./dist/lib"),
//         },
//       ]),
//     ],
//   },
//   devServer: {
//     host: "0.0.0.0",
//     port: port,
//     open: true,
//     proxy: {
//       [process.env.VUE_APP_BASE_API]: {
//         target: `http://10.0.6.31:8083`,
//         changeOrigin: true,
//         pathRewrite: {
//           ["^" + process.env.VUE_APP_BASE_API]: "",
//         },
//       },
//     },
//     disableHostCheck: true,
//   },
// };
module.exports = {
  lintOnSave: false,
  devServer: {
    port: "10086",
    host: "localhost",
    proxy: {
      "/": {
        target: "http://10.0.6.31:8083",
        changeOrigin: true,
        pathRewrite: { "^/": "" },
      },
    },
  },
};
