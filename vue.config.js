const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pages: {
    login: "src/pages/login/main.js",
    home: "src/pages/home/main.js",
    course: "src/pages/course/main.js",
  },
  chainWebpack: (config) => {
    config.plugin("copy").tap(([options]) => {
      options.patterns[0].globOptions.ignore.push("**/types.js");
      return [options];
    });
  },
  publicPath: "better/",
});
