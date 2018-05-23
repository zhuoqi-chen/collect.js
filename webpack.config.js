const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
module.exports = {
  entry: ["./src/index.js"],
  output: {
    libraryTarget: "umd",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
    filename: "collect.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: "url-loader?limit=100000"
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    historyApiFallback: true,
    noInfo: true
  },
  devtool: "#source-map",
  plugins: [
    // new BundleAnalyzerPlugin({
    //     analyzerHost: '0.0.0.0'
    // }),
  ]
};
