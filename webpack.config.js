const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    //mode: "development",
    entry: {
        'app':"./src/index.js"
    }, //entrypoint for webpack
    output: {
        path: __dirname,
        filename: "apps/[name]/build/bundle.js"
    },
    // resolve: {
    //     mainFields: ['browser', 'module', 'main', 'svelte'],
    //   },
    plugins:[new HtmlWebpackPlugin({
        filename: 'index.html',
        template:'./index.html',
        chunks: ['app']
    })
],
    module: {
        rules: [
            {
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					
			}},
            {
                test: /\.css$/, //if file ends in .css, how we are handling it
                use: ["style-loader", "css-loader"] //anytime you come across .css file, use css-loader

            },
            {
                test: /\.csv$/,
                loader: 'csv-loader',
                options: {
                    dynamicTyping: true,
                    header: true,
                    skipEmptyLines: true
                }
            },
            {
                // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
                test: /node_modules\/svelte\/.*\.mjs$/,
                resolve: {
                  fullySpecified: false
                }
              },
        ]
    }
}