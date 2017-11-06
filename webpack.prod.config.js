const {resolve} = require('path');
const webpack = require('webpack');
const DefinePlugin = webpack.DefinePlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: resolve(__dirname, 'src'),
    entry: [
        './scripts/main.js'
    ],
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query:
                    {
                        presets:['es2015', 'react']
                    }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: "css-loader"
                            },
                            {
                                loader: "sass-loader"
                            }
                        ],
                        fallback: "style-loader"
                    }
                )
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                use: 'url-loader'
            },
        ]
    },
    plugins: [
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new UglifyJsPlugin({
            sourceMap: false
        }),
        new ExtractTextPlugin({filename: 'styles.css', allChunks: true})
    ],
};