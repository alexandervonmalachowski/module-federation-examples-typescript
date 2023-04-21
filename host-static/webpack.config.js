// base plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// for static remotes
const WebpackRemoteTypesPlugin = require("webpack-remote-types-plugin").default;

const moduleFederationConfig = {
  name: "host_static",
  filename: "remoteEntry.js",
  exposes: {},
  remotes: {
    remote_a: "remote_a@http://localhost:3001/remoteEntry.js",
    remote_b: "remote_b@http://localhost:3002/remoteEntry.js",
    remote_vue: "remote_vue@http://localhost:3004/remoteEntry.js",
    remote_next:
      "remote_next@http://localhost:3000/_next/static/chunks/remoteEntry.js",
  },
  shared: {
    react: { singleton: true, eager: true, requiredVersion: deps.react },
    "react-dom": {
      singleton: true,
      eager: true,
      requiredVersion: deps["react-dom"],
    },
    "react-router-dom": {
      singleton: true,
      eager: true,
      requiredVersion: deps["react-router-dom"],
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
      port: 4001,
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
          test: /\.(tsx|ts)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 1,
                modules: {
                  localIdentName: "[name]_[local]_[sha1:hash:hex:4]",
                },
              },
            },
            {
              loader: "postcss-loader",
              options: { sourceMap: true },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin(),
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
    ],
  };
};
