const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pages: {
    login: "src/pages/login/main.js",
  },
  chainWebpack: (config) => {
    config.plugin("copy").tap(([options]) => {
      options.patterns[0].globOptions.ignore.push("**/types.js");
      return [options];
    });
  },
  publicPath: "better/"
});
