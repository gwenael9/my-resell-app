const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new (require("webpack").DefinePlugin)({
        __VUE_OPTIONS_API__: JSON.stringify(true), // Activer l'API Options
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false), // Désactiver les devtools en prod
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // Réduire les logs d'hydratation
      }),
    ],
  },
});
