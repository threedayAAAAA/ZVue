/*
 * @Descripttion: 
 * @version: 
 * @Author: 
 * @Date: 2020-05-16 12:59:37
 * @LastEditors: 三天
 * @LastEditTime: 2020-05-17 16:50:46
 */
import Compile from './Compile'

export default class ZVue { 
  constructor(options) { 
    this.$options = options || {}
    this.$data = this.$options['data']
    this.$methods = this.$options['methods']
    this.$el = new Compile(this.$options['el'], this)
  }
}