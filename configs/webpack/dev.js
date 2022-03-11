const { merge } = require("webpack-merge");
const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "development",
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:8080",
    "./index.tsx",
  ],
  devServer: {
    hot: "only",
    historyApiFallback: true,
  },
  devtool: "cheap-module-source-map",
  plugins: [],
});
