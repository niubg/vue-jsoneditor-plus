const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var glob = require('glob');

module.exports = {
    entry: getEntry('src/main.js'),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }, {
                test: /.vue$/,
                loader: "vue-loader"
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
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
        new VueLoaderPlugin(),
        new webpack.DllPlugin({
            context: __dirname,
            name: "[name]_[hash]",
            path: path.join(__dirname, "manifest.json"),
        })
          
    ]
}

function getEntry(globPath) {
    var files = glob.sync(globPath);
    var entries = {}, entry, dirname, basename, pathname, extname;
    for (var i = 0; i < files.length; i++) {
      entry = files[i];
      dirname = path.dirname(entry);
      extname = path.extname(entry);
      basename = path.basename(entry, extname);
      pathname = path.join(dirname, basename);
      pathname = pathname.substr(4);
      pathname = pathname.replace(/\\/g, '/');
      //pathname = pathname.replace('\\', '/');
      entries[pathname] = ['./' + entry];
    }
    return entries;
}  