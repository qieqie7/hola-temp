import path from 'path';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration as devConfiguration } from 'webpack-dev-server';

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

type Config = Configuration & devConfiguration;

const config: Config = {
  mode,
  entry: path.resolve(__dirname, '../src/index.ts'),
  output: { path: path.resolve(__dirname, '../dist'), filename: 'index.bundle.js' },
  plugins: [
    new HtmlWebpackPlugin({ title: 'webpack app', template: 'src/index.html' }),
    new HotModuleReplacementPlugin(),
  ],
  module: { rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }] },
  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },
  devServer: {
    // NOTE: 似乎和inline一起使用才有效果，没搞明白
    // contentBase: path.join(__dirname, './'),
    hot: true,
    // NOTE: 单页面应用且使用historyApi会用到，他会让所有请求均返回特定页面，但可以配置路由规则
    // historyApiFallback: true
    // inline: false
    port: 9527,
    open: true,
  },
};

export default config;