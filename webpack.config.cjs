const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        function_encoding: './src/js/function_encoding.js', // Full name
        frequency_encoding: './src/js/frequency_encoding.js', // Full name
        quantum_circuit: './src/js/quantum_circuit.js', // Full name
        chapter03: './src/js/chapter03.js', // Chapter 3
        chapter04: './src/js/chapter04.js', // Added Chapter 4
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/function_encoding.html',
            filename: 'function_encoding.html',
            chunks: ['function_encoding'],
        }),
        new HtmlWebpackPlugin({
            template: './public/frequency_encoding.html',
            filename: 'frequency_encoding.html',
            chunks: ['frequency_encoding'],
        }),
        new HtmlWebpackPlugin({
            template: './public/quantum_circuit.html',
            filename: 'quantum_circuit.html',
            chunks: ['quantum_circuit'],
        }),
        new HtmlWebpackPlugin({
            template: './public/chapter03.html',
            filename: 'chapter03.html',
            chunks: ['chapter03'],
        }),
        new HtmlWebpackPlugin({
            template: './public/chapter04.html', // Added Chapter 4 template
            filename: 'chapter04.html',
            chunks: ['chapter04'],
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            chunks: [],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/lib/utils/colormap.json', to: 'colormap.json' },
                { from: 'public/logo.png', to: 'logo.png' }, // Copy logo to output
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]',
                },
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};
