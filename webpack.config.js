import { resolve as _resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export const entry = "./src/App.tsx";
export const target = "web";
export const module = {
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
};
export const resolve = {
  extensions: ["", ".tsx", ".ts", ".js", ".jsx"],
};
export const output = {
  filename: "js/[name].bundle.js",
  path: _resolve(__dirname, "./dist"),
  publicPath: "",
};
export const plugins = [
  new HtmlWebpackPlugin({
    template: "./src/index.html",
    inject: true,
    minify: false,
  }),
];
