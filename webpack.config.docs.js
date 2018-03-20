var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',

    entry: {
        index: ['./docs/index.js']
    },

    output: {
        path: __dirname + '/build/docs',
        filename: '[name].js',
        publicPath: './'
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.(css|less)$/,
            loader: "style-loader!css-loader!less-loader"
        }, {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=50000&name=[path][name].[ext]'
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            ENV: `'dev'`,
            'process.env.NODE_ENV': '"dev"'
        }),
        new HtmlWebpackPlugin({
            filename: __dirname + '/build/docs/index.html',
            template: __dirname + '/docs/index.html',
            inject: 'body',
            hash: true
        })
    ]
}