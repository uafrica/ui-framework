module.exports = {
  style: {
    postOptions: {
      plugins: [require("tailwindcss"), require("autoprefixer")]
    }
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.plugins[5].options.filename = "index.css";
          return webpackConfig;
        }
      },
      options: {}
    }
  ],
  webpack: {
    configure: {
      output: {
        filename: "index.js"
      }
    }
  }
};
