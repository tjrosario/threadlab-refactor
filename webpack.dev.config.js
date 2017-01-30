var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');
var baseConfig = require('./webpack.base.config.js');

baseConfig.devtool = 'cheap-eval-source-map';

baseConfig.output.filename = '[name].js';

baseConfig.output.chunkFilename = '[name].js';

baseConfig.plugins.push(
	new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin(),
    new ExtractTextPlugin('[name].css')
);

module.exports = baseConfig;