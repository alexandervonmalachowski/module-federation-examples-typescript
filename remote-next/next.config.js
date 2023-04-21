/** @type {import('next').NextConfig} */
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const FileManagerWebPackPlugin = require("filemanager-webpack-plugin");

const deps = require("./package.json").dependencies;

const moduleFederationConfig = (isProduction) => ({
  name: "remote_next",
  filename: `${isProduction ? "static/chunks" : "static/ssr"}/remoteEntry.js`,
  exposes: {
    "./home": "./src/pages",
  },
  shared: {
    react: { singleton: true, eager: false, requiredVersion: deps.react },
    "react-dom": {
      singleton: true,
      eager: false,
      requiredVersion: deps["react-dom"],
    },
    "next/dynamic": {
      requiredVersion: false,
      singleton: true,
    },
    "styled-jsx": {
      requiredVersion: false,
      singleton: true,
    },
    "styled-jsx/style": {
      requiredVersion: false,
      singleton: true,
    },
    "next/link": {
      requiredVersion: false,
      singleton: true,
    },
    "next/router": {
      requiredVersion: false,
      singleton: true,
    },
    "next/script": {
      requiredVersion: false,
      singleton: true,
    },
    "next/head": {
      requiredVersion: false,
      singleton: true,
    },
  },
});

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    const isProduction = !options.dev;
    const mfConfig = moduleFederationConfig(isProduction);
    config.devtool = "source-map";
    config.module.rules.push({
      test: /\.(tsx|ts)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "dts-loader",
          options: {
            name: mfConfig.name, // The name configured in ModuleFederationPlugin
            exposes: mfConfig.exposes,
            typesOutputDir: "exposedTypes", // Optional, default is '.wp_federation'
          },
        },
      ],
    });
    config.plugins.push(new NextFederationPlugin(mfConfig));

    config.plugins.push(
      new FileManagerWebPackPlugin({
        events: {
          onEnd: {
            archive: [
              {
                source: `./exposedTypes/${mfConfig.name}`,
                destination: `./${
                  isProduction ? ".next/static/chunks" : ".next/static/chunks"
                }/${mfConfig.name}-dts.tgz`,
                format: "tar",
                options: {
                  gzip: true,
                },
              },
            ],
          },
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
