const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        main: path.resolve(__dirname, "main.ts"),
    },




    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name]-bundle.js",
        libraryTarget: "commonjs"
    },

    node: { __dirname: false },

    resolve: {
        // Add ".ts" and ".tsx" as resolvable extensions.
        extensions: [".ts", ".tsx", ".js"],
    },
    target: 'node',
    externals: [nodeExternals()]
    ,

    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'views', to: 'views'
                }
            ]
        }),
    ],
};