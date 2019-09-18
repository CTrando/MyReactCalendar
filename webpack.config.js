const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

const config = {
    mode: production ? 'production' : 'development',
    // change to .tsx if necessary
    entry: {
        demo: __dirname + '/src/demo.js',
    },
    output: {
        path: __dirname + '/dist/build',
        publicPath: '/dist/',
        filename: 'bundle.js',
    },
    resolve: {
        // changed from extensions: [".js", ".jsx"]
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' } },
            {test: /\.(t|j)sx?$/, use: {loader: 'awesome-typescript-loader'}},
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
            // addition - add source-map support
            {enforce: "pre", test: /\.js$/, loader: "source-map-loader"}
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new HtmlWebpackPlugin({
            title: 'My React Calendar',
            template: __dirname + '/public/index.html'
        }),
    ],
    devServer: {
        hot: false,
        inline: true,
        port: 8080,
        historyApiFallback: true,
        stats: {
            colors: true,
            profile: true,
            hash: false,
            version: false,
            timings: false,
            assets: true,
            chunks: false,
            modules: false,
            reasons: true,
            children: false,
            source: true,
            errors: true,
            errorDetails: false,
            warnings: true,
            publicPath: false,
        },
    },
    // addition - add source-map support
    devtool: "source-map"
};

console.log(config);
module.exports = config;
