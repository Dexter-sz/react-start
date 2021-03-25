const path = require('path');
const glob = require('glob');
const webpack = require('webpack'); // 访问内置的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionWebpackPlugin = require('compression-webpack-plugin');

// 消除无用样式
// let PurifycssWebpack = require("purifycss-webpack");

// 触发g压缩的文件格式
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;


module.exports = {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
        extensions: [".ts", ".tsx", ".js"]
    },
    devtool: 'inline-source-map',
    // 输入
    entry: {
        path: './src/app.tsx'
    },
    // 输出
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: './js/[name].[hash].js',
    },
    module: {
        rules: [
            // ts
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                        '@babel/preset-typescript'
                    ],
                    plugins: [
                        ['import', { libraryName: 'antd', style: 'css' }], // `style: true` 会加载 less 文件
                    ],
                }
            },
            {
                test: /\.css$/i,
                use: [
                    // 样式压缩 代替了style-loader
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/i,
                use: [
                    // 样式压缩 代替了style-loader
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        },
                    },
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/i,
                use: [
                    // 样式压缩 代替了style-loader
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        },
                    },
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: {
                                'primary-color': '#1DA57A',
                                'link-color': '#1DA57A',
                                'border-radius-base': '2px',
                            },
                            javascriptEnabled: true,
                        },
                    },
                    'postcss-loader'
                ],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                loader: 'url-loader',
                options: {
                    limit: 20000,
                }
            }
        ],
    },
    plugins: [
        // html模板
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        // 清除build的插件
        new CleanWebpackPlugin(),
        // 可视化包分析插件
        // new BundleAnalyzerPlugin(),
        // 样式去冗余
        // new PurifycssWebpack({
        //     paths: glob.sync(path.resolve("./build/*.html"))
        // }),
        // 样式分离工具
        new MiniCssExtractPlugin({
            filename: "./css/[name].[chunkhash:8].css",
            chunkFilename: "./css/[id].[chunkhash:8].css"
        }),
        // g压缩
        new CompressionWebpackPlugin({
            filename: './js/[name].gz[query]',
            algorithm: 'gzip',
            test: productionGzipExtensions,
            threshold: 10240,
            minRatio: 0.8
        })
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        quiet: true,
        open: true
    }
}