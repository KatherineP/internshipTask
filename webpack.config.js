const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  resolve: {
    fallback: {
      util: false,
      path: false,
      crypto: false,
      buffer: false,
      https: false,
      http: false,
      vm: false,
      os: false,
      fs: false,
      tls: false,
      net: false,
      stream: false,
      child_process: false,
      constants: false,
      assert: false,
      worker_threads: false,
    },
  },
  mode: 'none',
  entry: __dirname + '/src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/public/index.html',
      inject: 'body',
    }),
  ],
};
