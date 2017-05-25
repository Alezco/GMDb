const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  context: resolve(__dirname, '../../src'),
  entry: [
	'react-hot-loader/patch',
	'webpack-dev-server/client?http://localhost:8080',
	'webpack/hot/only-dev-server',

	  './index.jsx'
  ],
  output: {
    path: resolve(__dirname, '../../dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
    sourceMapFilename: '[name].map'
  },
  devtool: 'inline-source-map',
    devServer: {
      hot: true,
      // enable HMR on the server
      contentBase: resolve(__dirname, 'dist'),
      // match the output path
      publicPath: '/'
      // match the output `publicPath`
	},
      module: {
	      rules: [
	      		{
      				test: /\.(js|jsx)$/,
      				use: [ 'babel-loader',],
      				exclude: /node_modules/
      	   	},
            {
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader' ]
            },
	      	],
  },
  plugins: [
    new HtmlWebpackPlugin({
    template: '../src/index.html',
    chunksSortMode: 'dependency'
    }),

	new webpack.HotModuleReplacementPlugin(),
	// enable HMR globally
	new webpack.NamedModulesPlugin(),
	// prints more readable module names in the browser console on HMR updates
  ],
};
