const {resolve} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: resolve(__dirname, 'src'),
    entry: [
        './scripts/main.js'
    ],
    output: {
        filename: 'main.js',
    },
    devtool: 'source-map',
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
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
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
                ))
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)|\.mp3($|\?)/,
                use: 'url-loader'
            },
            {
                test: /\.(jpe?g|gif|png|mp3|svg|JPG)$/,
                loader: 'file-loader?emitFile=false&name=[path][name].[ext]'
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin({filename: 'styles.css', allChunks: true})
    ],
};
