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
