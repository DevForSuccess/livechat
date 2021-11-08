// const path = require('path');
import path from 'path';

module.exports = {
  mode: 'development',
  entry: path.resolve(new URL(import.meta.url).pathname, 'client/src/index.js'),
  output: {
    path: path.resolve(new URL(import.meta.url).pathname, 'client/dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    }
    ]
  }
}