/*
 * @Descripttion: 
 * @version: 
 * @Author: 
 * @Date: 2020-05-17 15:18:49
 * @LastEditors: 三天
 * @LastEditTime: 2020-05-17 21:05:49
 */ 
export default {
  getVal(vm, exp) { // a.b.c
    const segments = exp.split(".")
    let res = vm.$data
    for (let i = 0, L = segments.length; i < L; i++) { 
      res = res[segments[i]]
      if (!res) return 
    }
    return res
  },
  setVal(vm, exp, val) { // a.b.c
    const segments = exp.split(".")
    let obj = vm.$data
    for (let i = 0, L = segments.length; i < L - 1; i++) { 
      obj = obj[segments[i]]
      if (!obj) return 
    }
    obj[segments.pop()] = val
  }
}