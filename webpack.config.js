const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/App.ts",
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
    // loaders: [
    //   { exclude: ["node_modules"], loader: "babel", test: /\.jsx?$/ },
    //   { loader: "style-loader!css-loader", test: /\.css$/ },
    //   { loader: "url-loader", test: /\.gif$/ },
    //   { loader: "file-loader", test: /\.(ttf|eot|svg)$/ },
    // ],
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
