const nextTranslate = require("next-translate");

const customModule = nextTranslate({
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  webpack: (config) => {
    return config;
  },
});

module.exports = customModule;
