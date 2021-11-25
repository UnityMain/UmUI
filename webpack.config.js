const path = require('path');
// html生成插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清理生成目录插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 自带插件
const webpack = require('webpack');
// Vue加载插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');


var config = require('./config');

module.exports = {
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'xlsx': 'Xlsx',
    'blob': 'Blob',
    'fileSaver': 'FileSaver',
    'lodash': 'Lodash',
    'nplayer': 'NPlayer',
    '@nplayer/danmaku': 'NPlayerDanmaku'
  },
  entry: {
    app1: './src/pages/main/index.js',
  },
  devServer: config.devServer,
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',

      },
      {
        test: /\.(eot|xls|svg|ttf|woff|woff2)(\?\S*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'aaa/[name].[ext]?[hash]'
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader?esModule=false',
          options: {
            name: 'image/[name].[ext]?[hash]'
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    // build清理文件
    new CleanWebpackPlugin(),
    // 自动生成index.HTML
    new HtmlWebpackPlugin({
      filename: "index1.html",
      title: '裙下牛仔裤',
      template: './src/pages/main/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: "fans.html",
      title: '裙下牛仔裤',
      template: './src/pages/fans/index.html',
      chunks: ['']
    }),
    new HtmlWebpackPlugin({
      filename: "EDG.html",
      title: '裙下牛仔裤',
      template: './src/pages/edg/index.html',
      chunks: ['']
    }),
    new HtmlWebpackPlugin({
      filename: "money.html",
      title: '裙下牛仔裤',
      template: './src/pages/money/index.html',
      chunks: ['']
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: '裙下牛仔裤',
      template: './src/pages/blog/index.html',
      chunks: ['']
    }),
    new HtmlWebpackPlugin({
      filename: "game1.html",
      title: '裙下牛仔裤',
      template: './src/pages/games/game1/index.html',
      chunks: ['']
    }),
    new HtmlWebpackPlugin({
      filename: "game2.html",
      title: '裙下牛仔裤',
      template: './src/pages/games/game2/index.html',
      chunks: ['']
    }),
    new HtmlWebpackPlugin({
      filename: "game3.html",
      title: '裙下牛仔裤',
      template: './src/pages/games/game3/index.html',
      chunks: ['']
    }),
    new HtmlWebpackPlugin({
      filename: "game4.html",
      title: '裙下牛仔裤',
      template: './src/pages/games/game4/index.html',
      chunks: ['']
    }),
    new HtmlWebpackPlugin({
      filename: "game5.html",
      title: '裙下牛仔裤',
      template: './src/pages/games/game5/index.html',
      chunks: ['']
    }),
    //热部署
    new webpack.HotModuleReplacementPlugin(),
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ],
  output: {
    filename: 'js/[name]-[contenthash].bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src')
    }
  }
};