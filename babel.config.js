module.exports = function (api) {
  api.cache(true);

  const babelConfig = {
    presets: [
      [
        "next/babel",
        {
          "preset-env": {},
          "transform-runtime": {},
          "preset-typescript": {},

          "preset-react": {
            runtime: "automatic",
            importSource: "@emotion/react",
          },
        },
      ],
    ],
    plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-syntax-dynamic-import',
      "@emotion/babel-plugin",
      "macros",
      [
        "module-resolver",
        {
          extensions: [".js", ".jsx", ".css", ".scss"],
          root: ["./"],
          alias: {
            /* This is for NodeJS tools like Jest */
            "~": ".",
            pages: "./pages",
            components: "./components",
            utils: "./utils",
          },
        },
      ],
    ],
  };

  return babelConfig;
};
