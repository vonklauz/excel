const path = require('path')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[fullhash].${ext}`
// const jsLoaders = () => {
//   return {
//     loader: 'babel-loader',
//     options: {
//       presets: ['@babel/preset-env']
//     }
//   }
// }

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      // чтобы не писать ../../core/component, а вместо него @core/component
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core')
    }
  },
  devtool: 'source-map',
  devServer: {
    port: 3000,
    hot: isDev
  },
  target: isDev ? 'web' : 'browserslist',
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html',
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist')
      }, ],
      options: {
        concurrency: 100,
      },
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
  ],
  module: {
    rules: [{
      test: /\.s[ac]ss$/i,
      use: [
        MiniCssExtractPlugin.loader,
        // Translates CSS into CommonJS
        'css-loader',
        // Compiles Sass to CSS
        'sass-loader',
      ],
    }, {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    }],
  },
}