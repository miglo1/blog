var path = require('path'); //node 原生path模块
var webpack = require('webpack'); // webpack
var glob = require('glob'); // glob模块，用于读取webpack入口目录文件
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //webpack插件
var HtmlWebpackPlugin = require('html-webpack-plugin'); //webpack插件
var OpenBrowserPlugin = require('open-browser-webpack-plugin');//webpack插件
var CleanPlugin = require('clean-webpack-plugin')//webpack插件，用于清除目录文件
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;//处理trunk
var getEntry = function() {
    var entry = {};
    //读取开发目录,并进行路径裁剪
    glob.sync('./js/*.js')
        .forEach(function(name) {
            var start = name.indexOf('js/') + 3,
                end = name.length - 2;
            var n = name.slice(start, end);
            n = n.slice(0, n.lastIndexOf('/'));
            //保存各个组件的入口
            entry[n] = name;
        });
    return entry;
};

module.exports = {
    devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
    entry: getEntry(),//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/public",//打包后的文件存放的地方
        filename: "[name].js"//打包后输出文件的文件名
    },
    module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style!css'//添加对样式表的处理
      }
    ]
  },
    devServer: {
        port:"8888",
        contentBase: "./",//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
  }
}