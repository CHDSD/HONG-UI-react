var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'h-ui-react.js',
    library: 'HuiReact',
    libraryTarget: 'umd',
  },

  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'react-router': {
      root: 'ReactRouter',
      commonjs2: 'react-router',
      commonjs: 'react-router',
      amd: 'react-router',
    }
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader?sourceMap=true", "sass-loader?sourceMap=true"]
        })
      },

      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },

      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=512&name=image/[name].[ext]?[hash]'
      }
    ]
  },


  plugins: [

    // 将代码中的process.env.NODE_ENV替换为production，方便webpack压缩代码
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),

    // // 压缩js代码
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true
    // }),

    // 提取css
    new ExtractTextPlugin('h-ui.css')
  ],

  // devtool: "source-map",
};

var env = process.env.NODE_ENV;
console.log("node env: \x1b[32m" + env + "\x1b[0m");

module.exports = config;