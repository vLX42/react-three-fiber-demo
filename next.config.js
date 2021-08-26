const withPlugins = require("next-compose-plugins");
const withTranspileModules = require("next-transpile-modules");

module.exports = withPlugins(
  [
    withTranspileModules([
      "@dfds-ui/react-components",
      "@dfds-ui/colors",
      "@dfds-ui/forms",
      "@dfds-ui/icons",
      "@dfds-ui/modal",
      "@dfds-ui/grid",
      "@dfds-platform/business-components",
      "@dfds-ui/experiences",
      "@dfds-ui/google-places",
    ]),
  ],
  {
    trailingSlash: true,
    future: {
      webpack5: true,
      webpack(config, options) {
        config.module.rules.push({
          test: /\.test.js$/,
          loader: "ignore-loader",
        });

        config.module.rules.push({
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        });

        config.module.rules.push({
          test: /\.(eot|woff|woff2)$/,
          loader: "ignore-loader",
          // use: {
          //   loader: 'url-@dfds-ui',
          //   options: {
          //     limit: 10000,
          //     name: '[name].[ext]',
          //   },
          // },
        });

        return config;
      },
    },
    images: {
      domains: [],
    },
  }
);
