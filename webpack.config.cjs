const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        function_encoding: './src/js/function_encoding.js', // Full name
        frequency_encoding: './src/js/frequency_encoding.js', // Full name
        quantum_circuit: './src/js/quantum_circuit.js',               // Full name
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/function_encoding.html', // Full name
            filename: 'function_encoding.html',          // Full name
            chunks: ['function_encoding'],               // Full name
        }),
        new HtmlWebpackPlugin({
            template: './public/frequency_encoding.html', // Full name
            filename: 'frequency_encoding.html',          // Full name
            chunks: ['frequency_encoding'],               // Full name
        }),
        new HtmlWebpackPlugin({
            template: './public/quantum_circuit.html',        // Full name
            filename: 'quantum_circuit.html',                 // Full name
            chunks: ['quantum_circuit'],                      // Full name
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            chunks: [],
        }),

        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/lib/utils/colormap.json', to: 'colormap.json' },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};
