const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require('path')
module.exports = (env) => {
    return ({
        mode: 'development',
        entry: path.resolve(__dirname, 'src/index'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            filename: 'script/[name].bundle.js'
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.scss', '.jsx', '.sass', '.css']
        },
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            stats: 'errors-only',

            port: 2500,

            // CopyWebpackPlugin: This is required for webpack-dev-server.
            // The path should be an absolute path to your build destination.
            contentBase: path.join(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.tsx$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true
                            }
                        },
                        {loader: 'ts-loader'},
                    ]
                },
                {
                    test: /\.(sa|sc|c)ss$/i,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: true,
                                url: true,
                            }
                        },
                        {loader: 'sass-loader'}
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[hash].[ext]',
                                context: path.resolve(__dirname, 'public/assets/images/'),
                                outputPath: 'assets/images',
                                publicPath: '/assets/images',
                                useRelativePath: true
                            },
                        },
                    ],
                },
                {
                    test: /\.(svg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 25000
                            }
                        }
                    ]
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public/index.html'),
                title: 'Jollie Bridal'
            })
        ]
    })
}
