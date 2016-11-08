const webpack = require('webpack');
const path    = require('path');

const TRAVIS  = process.env.TRAVIS ? JSON.parse(process.env.TRAVIS) : false;

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname + '/dist/'),
        publicPath: 'dist/',
        filename: 'ThetaLiveVR.js',
        library: 'ThetaLiveVR',
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    bail: TRAVIS
};
