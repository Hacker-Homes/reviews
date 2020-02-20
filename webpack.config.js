
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client', 'src', 'index.jsx'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[sha1:hash:hex:6]',
            },
          },
        ],
      },
    ],
  },
  resolve: { extensions: ['.jsx', '.js'] },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client', 'public'),
  },
};
