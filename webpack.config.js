const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/App.tsx",
  target: "web",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["", ".tsx", ".ts", ".js", ".jsx"],
  },
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      minify: false,
    }),
  ],
};
