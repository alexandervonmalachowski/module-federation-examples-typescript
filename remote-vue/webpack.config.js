const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const WebpackRemoteTypesPlugin = require("webpack-remote-types-plugin").default;
const FileManagerWebPackPlugin = require("filemanager-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const moduleFederationConfig = {
  name: "remote_vue",
  filename: "remoteEntry.js",
  exposes: {
    "./vue_app": "./src/index",
    "./vue_bootstrap": "./src/bootstrap",
  },
  remotes: {},
  shared: {
    ...deps,
    vue: { singleton: true, eager: true, requiredVersion: deps.vue },
    "vue-router": {
      singleton: true,
      eager: true,
      requiredVersion: deps["vue-router"],
    },
  },
};

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  return {
    entry: "./src/index.ts",
    mode: "development",
    devtool: "source-map",
    output: {
      publicPath: "auto",
    },
    devServer: {
      port: 3004,
      open: false,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.(tsx|ts)$/,
          loader: "ts-loader",
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(tsx|ts)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "dts-loader",
              options: {
                name: moduleFederationConfig.name, // The name configured in ModuleFederationPlugin
                exposes: moduleFederationConfig.exposes,
                typesOutputDir: "exposedTypes", // Optional, default is '.wp_federation'
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ["vue-style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: "file-loader",
          options: {
            name: "public/images/[name].[ext]",
          },
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new ModuleFederationPlugin(moduleFederationConfig),
      new WebpackRemoteTypesPlugin({
        remotes: isProduction ? moduleFederationConfig.remotes : [],
        outputDir: "types/[name]",
        remoteFileName: "[name]-dts.tgz",
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new ForkTsCheckerWebpackPlugin(),
      new FileManagerWebPackPlugin({
        events: {
          onEnd: {
            archive: [
              {
                source: `./exposedTypes/${moduleFederationConfig.name}`,
                destination: `./${isProduction ? "dist" : "public"}/${
                  moduleFederationConfig.name
                }-dts.tgz`,
                format: "tar",
                options: {
                  gzip: true,
                },
              },
            ],
          },
        },
      }),
    ],
  };
};
