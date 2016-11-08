const webpack = require('webpack');
const path    = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname + '/dist/'),
        publicPath: 'dist/',
        filename: 'ThetaLiveVR.js',
        library: 'ThetaLiveVR',
        libraryTarget: 'umd'
    },
    devtool: 'source-map'
};
