var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      //bxu1: semantic ui
      //'semantic': resolve('../node_modules/semantic-ui-css/semantic.min.js')
      //如果需要其他external semantic ui lib
      /*
      'moment': path.resolve(__dirname, '../node_modules/moment/min/moment-with-locales.js'),
      'numeral': path.resolve(__dirname, '../node_modules/numeral/min/numeral.min.js'),
      'gridster': path.resolve(__dirname, '../node_modules/gridster/dist/jquery.gridster.min.js'),
      'semantic': path.resolve(__dirname, '../node_modules/semantic-ui-css/semantic.min.js'),
      'stapes': path.resolve(__dirname, '../node_modules/stapes/stapes.min.js')
      */
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          //bxu1
          resolve('node_modules/vue-awesome')
          ],
        exclude: /node_modules(?![\\/]vue-awesome[\\/])/
        /* end */
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
