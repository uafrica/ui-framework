const path = require("path");
const enableImportsFromExternalPaths = require("./src/enableImportsFromExternalPaths");

// Paths to the code you want to use
const thisLib = path.resolve(__dirname, "../src");

module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")]
    }
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          enableImportsFromExternalPaths(webpackConfig, [thisLib]);
          return webpackConfig;
        }
      }
    }
  ]
};
