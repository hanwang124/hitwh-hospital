var path = require('path')
var webpack = require('webpack')
var htmlWebpackPlugin = require('html-webpack-plugin')
// const proxy = require('http-proxy-middleware');
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
     /* {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },*/

      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          plugins: ['syntax-dynamic-import']
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      { test: /\.(eot|woff|ttf)$/, loader: 'file-loader' }
    ]
  },
  /*  plugins: [
      new htmlWebpackPlugin({
        template: '@/layout/layout.vue',
        favicon: 'favicon.ico',
        inject: true
      })
    ],*/
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    // noInfo: true,
    // overlay: true,
    // host: '47.97.219.104',//target host
    // port: 8080,
    hot: true,
    inline: true,
    stats: { colors: true },
    proxy: {
      '/hospital': {
        target: 'http://47.97.219.104:8080',
        pathRewrite: { ['^' + process.env.VUE_APP_BASE_API]: '/' },
        changeOrigin: true
      }
    },
    // proxyTable: {
    //   '/apis': {
    //     // 测试环境
    //     target: 'http://www.thenewstep.cn/',  // 接口域名
    //     changeOrigin: true,  //是否跨域
    //     pathRewrite: {
    //         '^/apis': ''   //需要rewrite重写的,
    //     }              
    //   }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
