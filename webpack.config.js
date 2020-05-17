/*
 * @Descripttion:
 * @version:
 * @Author:
 * @Date: 2020-05-16 13:42:55
 * @LastEditors: 三天
 * @LastEditTime: 2020-05-17 13:11:32
 */

const path = require('path');
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './core/ZVue.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'ZVue.js',
    library: 'ZVue', // 指定类库名,主要用于直接引用的方式(比如使用script 标签)
    libraryExport: 'default', // 对外暴露default属性，就可以直接调用default里的属性
    globalObject: 'this' // 定义全局变量,兼容node和浏览器运行，避免出现"window is not defined"的情况
  },
  mode: 'development',
  devServer: {
    contentBase: './dist',
    open: true,
    port: 23333,
    hot: true
  },
  // plugins: [new webpack.HotModuleReplacementPlugin()]
};
