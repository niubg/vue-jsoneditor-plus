const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

module.exports = {
    // entry: './src/App.vue',
    output: {
        filename: 'my-first-webpack.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader'
            },{
                test: /.vue$/,
                loader: "vue-loader"
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname),
        port: 8888,
        open: true,
        inline: true
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/index.html'
        }),
    ]
}