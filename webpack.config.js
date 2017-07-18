// to learn more about webpack : https://www.youtube.com/watch?v=IYuh8hIyvfE&list=PL55RiY5tL51rcCnrOrZixuOsZhAHHy6os&index=7

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebPackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] }
                }]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg|png|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        // publicPath: 'img/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({ GMaps: 'GMaps', $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' }),
        extractPlugin,
        new HtmlWebPackPlugin({ template: 'src/index.html' }),
        new CleanWebpackPlugin(['dist'])
    ]
};


