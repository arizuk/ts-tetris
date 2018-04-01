module.exports = {
    mode: 'development',
    entry: './src/app.ts',
    output: {
        path: __dirname + '/public/dist',
        filename: 'app.js'
    },
    devServer: {
        contentBase: 'public',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts', '.js'
        ]
    }
};
