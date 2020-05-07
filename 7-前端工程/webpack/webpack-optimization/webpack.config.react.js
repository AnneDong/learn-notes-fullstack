let path = require('path')
let Webpack = require('webpack')
module.exports = {
    mode: 'development',
    entry: {
        react: ['react','react-dom']
    },
    output: {
        filename: '_dll_[name].js',
        path: path.resolve(__dirname,'dist'),
        library: '_dll_[name]',
        // libraryTarget: 'commonjs'
    },
    plugins: [
        new Webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.resolve(__dirname,'dist','manifest.json')
        })
    ]
}