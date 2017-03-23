'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    entry: {
        main: [_path2.default.resolve(__dirname, 'static/entry.js')],
        vendors: ['vue', 'vue-router']
    },
    output: {
        publicPath: '/',
        path: _path2.default.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash:7].js',
        chunkFilename: 'js/[id].[hash:7].js'
    },
    resolve: {
        extensions: ['', '.js', '.css', '.vue', '.json'],
        alias: {
            'vue': 'vue/dist/vue.runtime.common.js',
            'docs': _path2.default.resolve(__dirname, 'static/docs'),
            'pages': _path2.default.resolve(__dirname, 'static/pages'),
            'components': _path2.default.resolve(__dirname, 'static/components')
        }
    },
    plugins: [new _webpack2.default.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }), new _webpack2.default.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }), new _webpack2.default.optimize.OccurenceOrderPlugin(), new _extractTextWebpackPlugin2.default('css/[name].[hash:7].css'), new _webpack2.default.optimize.CommonsChunkPlugin('vendors', 'js/vendors.[hash:7].js'), new _htmlWebpackPlugin2.default({
        filename: 'index.html',
        template: _path2.default.resolve(__dirname, 'index.html')
    })],
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: _extractTextWebpackPlugin2.default.extract('style', 'css')
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 1,
                name: 'img/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 1,
                name: 'fonts/[name].[hash:7].[ext]'
            }
        }]
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-vue-jsx', 'transform-runtime']
    },
    vue: {
        loaders: {
            css: _extractTextWebpackPlugin2.default.extract('vue-style-loader', 'css-loader')
        },
        postcss: [(0, _autoprefixer2.default)({ browsers: ['last 7 versions'] })]
    }
};