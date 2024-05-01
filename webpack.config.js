// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = MiniCssExtractPlugin.loader;

// read all html files in 'html' folder
const htmlDirectory = path.resolve(__dirname, 'html');

// get all html file names except 'index.html'
const htmlPageNames = fs.readdirSync(htmlDirectory)
.filter(file => file.endsWith('.html') && file !== 'index.html')
.map(file => file.replace('.html', ''));

const multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `${htmlDirectory}/${name}.html`,
    filename: `${name}.html`,
    chunks: [name]
  });
});


function generateComponentOptions(componentDir) {
  const directoryPath = path.resolve(__dirname, componentDir);
  const components = fs.readdirSync(directoryPath)
  .filter(file => file.endsWith('.html'))
  .map(file => ({
    path: path.join(componentDir, file),
    placeholder: `<${path.basename(file, '.html')}></${path.basename(file, '.html')}>`
  }));

  return components;
}

const components = generateComponentOptions('./component');

const config = {
  entry: './src/index.ts',
    output: {
    path: path.resolve(__dirname, 'dist')
  },
    devServer: {
    open: true,
    host: 'localhost'
  },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${htmlDirectory}/index.html`
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ].concat(multipleHtmlPlugins),
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            {
              test: /\.html$/,
              use: [
                'html-loader',
                {
                  loader: path.resolve(__dirname, 'inject-multiple-components-loader.js'),
                  options: {
                    components: components
                  }
                }
              ]
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
    mode: isProduction ? 'production' : 'development'
};

module.exports = config;
