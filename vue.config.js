const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    hot: false, // Disable Hot Module Replacement
  },
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: JSON.stringify(true), // Enable Options API
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false), // Disable devtools in production
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // Suppress hydration mismatch warnings
      });
      return definitions;
    });
  },
})
