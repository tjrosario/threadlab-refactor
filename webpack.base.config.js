"use strict";

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');
var DIST_DIR = path.join(__dirname, 'dist');

module.exports = function makeWebpackConfig() {

    var config = {};

    config.entry = [
        'webpack-hot-middleware/client',
        './frontend/src/app/app.module.js'
    ];

    config.output = {
        path: DIST_DIR,
        publicPath: '/'
    };

    config.module = {
        loaders: [{
            test: /\.js$/,
            loader: 'ng-annotate!babel',
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css!sass')
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            loader: 'file'
        }, {
            test: /\.html$/,
            loader: 'raw'
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=65000&mimetype=application/font-woff"
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=65000&mimetype=application/font-woff"
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=65000&mimetype=application/octet-stream"
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file"
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=65000&mimetype=image/svg+xml"
        }]
    };

    config.plugins = [];

    config.plugins.push(
    	new webpack.EnvironmentPlugin(['NODE_ENV']),
        new HtmlWebpackPlugin({
            template: './frontend/src/app/index.html',
            filename: path.join(DIST_DIR, 'index.html'),
            inject: 'body'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    );

    config.resolve = {
        modulesDirectories: [
            'node_modules',
            'app'
        ]
    };

    return config;

}();