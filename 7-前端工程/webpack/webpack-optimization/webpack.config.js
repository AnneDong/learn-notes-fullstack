let path = require('path')
let HtmlwebpackPlugin = require('html-webpack-plugin')
let Webpack = require('webpack')
let Happypack = require('happypack')
module.exports = {
    mode: 'development',
    devServer: {
        hot: true, //启用热更新
        port: 3000,
        open: true,
        contentBase: './dist'
    },
    entry: './src/index.js',
    // entry: {
    //     index: './src/index.js',
    //     other: './src/other.js'
    // },
    output: {
        // filename: 'bundle.js',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             common: {
    //                 chunks: 'initial',
    //                 minSize: 0,
    //                 minChunks: 2
    //             },
    //             vendor: {
    //                 priority: 1,
    //                 chunks: 'initial',
    //                 minSize: 0,
    //                 minChunks: 2
    //             }
    //         }
    //     }
    // },
    module: {
        noParse: /jquery/,
        rules: [
            {
                test: /\.js$/,
                // use: 'Happypack/loader?id=js'
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        // new Happypack({
        //     id: 'js',
        //     use: [{
        //         loader: 'babel-loader',
        //         options: {
        //             presets: [
        //                 '@babel/preset-env',
        //                 '@babel/preset-react'
        //             ]
        //         }
        //     }]
        // }),
        new HtmlwebpackPlugin({
            template: './public/index.html',
        }),
        new Webpack.IgnorePlugin(/\.\/locale/,/moment/),
        new Webpack.NamedModulesPlugin(), // 打印更新的模块的路径
        new Webpack.HotModuleReplacementPlugin() //热更新插件
        // new Webpack.DllReferencePlugin({
        //     manifest: path.resolve(__dirname,'dist','manifest.json')
        // })
    ]
}