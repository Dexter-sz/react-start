const path = require('path');
const webpack = require('webpack'); // 访问内置的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');



module.exports = {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
        extensions: [".ts", ".tsx", ".js"]
    },
    devtool: 'inline-source-map',
    entry: {
        path: './src/app.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash].js',
    },
    module: {
        rules: [
            // js
            {
                test: /\.(js|jsx|tsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
                exclude: /node_modules/,
            },
            // ts
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // css
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'scss-loader'
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin(),
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        quiet: true,
        open: true
    }
}