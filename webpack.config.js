module.exports = {
    mode: 'development',
    entry: './src/app.ts',
    output: {
        path: __dirname + '/public/dist/',
        filename: 'app.js'
    },
    devServer: {
        contentBase: 'public',
        publicPath: '/dist/',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                use: 'tslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader'},
                    { loader: 'css-loader'},
                    { loader: 'sass-loader'},
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts', '.js'
        ]
    }
};
