const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: {
    main: "./src/main.ts",
  },
  output: {
    filename: "./dst/[name].[hash].js",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js", ".html"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.html$/,
        loader: "raw-loader",
        exclude: ["./src/index.html"],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "vue-style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]__[local]__[hash:base64:5]",
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [require("precss"), require("autoprefixer"), require("postcss-flexbugs-fixes")];
              },
            },
          },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ],
  devServer: {
    port: 8080,
    host: "localhost",
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    contentBase: "./src",
    open: true,
  },
};

module.exports = config;
