import path from 'path';

export default () => ({
    entry: './index',
    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'SpotifyWrapper',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader',
            },
        ],
    },
});
