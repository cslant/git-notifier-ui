const StylelintPlugin = require("stylelint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const config = {
    entry: {
        main: [
            "./src/css/nucleo-icons.css",
            "./src/css/nucleo-svg.css",
            "./src/css/material-dashboard.css",
            "./src/js/core/popper.min.js",
            "./src/js/core/bootstrap.min.js",
            "./src/js/plugins/perfect-scrollbar.min.js",
            "./src/js/plugins/smooth-scrollbar.min.js",
        ],
        editor: {
            import: [
                // CSS
                './src/assets/css/style.css',
                // SCSS
                './src/assets/scss/style.scss',
                // JS
                './src/assets/js/script.js',
            ]
        }
    },
    output: {
        filename: "js/[name].js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "",
                        },
                    },
                    "css-loader",
                    "postcss-loader",
                ],
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.svg/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 8192
                    }
                },
                use: 'svgo-loader',
                generator: {
                    filename: "assets/img/[name][ext][query]",
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[name][ext][query]",
                }
            },
            {
                test: /\.(png|jpg|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/img/[name][ext][query]",
                }
            },
        ],
    },
    externals: {
        jquery: 'jQuery',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 6,
                },
            }),
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new StylelintPlugin({
            files: ["./**/*.{scss,sass}"],
            fix: true,
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
    ],
};

module.exports = (env, { mode }) => {
    config.devtool = mode === "development" ? "eval-cheap-module-source-map" : "source-map";
    return config;
};
