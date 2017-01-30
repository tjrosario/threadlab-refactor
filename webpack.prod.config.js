var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var baseConfig = require('./webpack.base.config.js');

baseConfig.devtool = 'cheap-module-source-map';

baseConfig.output.filename = '[name].[hash].js';

baseConfig.output.chunkFilename = '[name].[hash].js';

baseConfig.plugins.push(
	new ExtractTextPlugin('[name].[hash].css'),
	new webpack.NoErrorsPlugin(),
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.UglifyJsPlugin({}),
	new CopyWebpackPlugin([
		{
	    	from: __dirname + '/frontend/src/assets/fonts',
	    	to: __dirname + '/dist/fonts'
		}, {
	    	from: __dirname + '/frontend/src/assets/images',
	    	to: __dirname + '/dist/images'
		}
	])
);

module.exports = baseConfig;