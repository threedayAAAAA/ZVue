/*
 * @Descripttion: 
 * @version: 
 * @Author: 
 * @Date: 2020-05-16 12:58:03
 * @LastEditors: 三天
 * @LastEditTime: 2020-05-17 20:58:58
 */ 
import Util from './Util'

export default class Compile{ 
  constructor(el, vm){ 
    this.$vm = vm
    this.$el = this.isElementNode(el) ? el : document.querySelector(el)
    
    // 对dom节点进行编译
    if (this.$el) { 
      this.$fragment = this.createFragment(this.$el)
      this.$el.appendChild(this.$fragment)
    }
    console.log(this.$el)
    this.compile(this.$el)
  }

  /**
   * @method: compile
   * @msg: 将整个文档碎片进行编译
   * @param {DOM} 
   * @return: {DOM}
   */
  compile(el) { 
    let childs = Array.from(el.childNodes)
    childs.forEach(node => { 
      const text = node.textContent
      const reg = /\{\{(.*?)\}\}/g;
      // 如果node是元素节点,则对node进行编译
      if (this.isElementNode(node)) { 
        //console.log("元素节点", node)
        this.compileElement(node)
      }
      // 如果是文本节点则解析节点内的{{}}里的内容
      if (this.isTextNode(node)) { 
        //console.log("文本节点", node)
        this.compileText(node)
      }
      // 如果有子节点则对子节点进行递归编译
      if (node.childNodes && node.childNodes.length > 0) { 
        this.compile(node)
      }
    })
  }

  /**
   * @method:compileElement 
   * @msg: 编译元素节点 对某节点上的指令进行解析
   * @param {DOM} 
   * @return: {type}
   */
  compileElement(node) { 
    const nodeAttrs = Array.from(node.attributes)
    nodeAttrs.forEach(attr => { 
      const { name: attrName, value: exp } = attr
      // 判断属性是否是指令
      if (this.isDirective(attrName)) { 
        const [, dir] = attrName.split("-") // v-html v-on:xxx
        const [dirName, eventName] = dir.split(":")
        // 事件指令时
        if (this.isEventDirective(attrName)) { 
          compileUtil.eventHandler(node, this.$vm, exp, eventName)
        } else {
        // 普通指令时
          compileUtil[dirName] && compileUtil[dirName](node, this.$vm, exp, eventName)
        }
        console.log("移除")
        console.log(attr)
        // 在属性里移除该指令
        node.removeAttribute(attrName)
      }
    })

  }

  /**
   * @method: compileText
   * @msg: 编译文本节点
   * @param {type} 
   * @return: {type}
   */
  compileText(node) { 
    const reg = /\{\{(.*?)\}\}/g;
    const text = node.textContent.replace(reg, (...arg) => Util.getVal(this.$vm, arg[1]))
    updater.textUpdater(node, text)
  }

  /**
   * @method: isElementNode
   * @msg: 判断元素是否为元素节点
   * @param {any} el
   * @return: {boolean} 
   */
  isElementNode(el) { 
    return typeof el === 'object' && el.nodeType === 1
  }

  /**
   * @method: isTextNode
   * @msg: 判断元素是否为文本节点
   * @param {any} el
   * @return: {boolean} 
   */
  isTextNode(el) { 
    return typeof el === 'object' && el.nodeType === 3
  }

  /**
   * @method: isDirective
   * @msg: 根据该属性是否v-开头,判断是否是指令,
   * @param {string} attr
   * @return: {boolean}
   */
  isDirective(attr) { 
    return attr.indexOf("v-") === 0
  }

  /**
   * @method: isEventDirective
   * @msg: 根据该属性是否v-on开头,判断是否是事件指令,
   * @param {string} attr
   * @return: {boolean}
   */
  isEventDirective(attr) { 
    return this.isDirective(attr) && attr.indexOf("v-on") === 0
  }

  /**
   * @method: createFragment
   * @msg: 创建文档碎片,将根节点以及根节点的所有子节点放置于文档碎片中,
   *        减少dom操作,从而减少回流与重绘
   * @param {DOM} 
   * @return: {DOM}
   */
  createFragment(el) { 
    let fragment = document.createDocumentFragment(),
      child
    while (child = el.firstChild) {
      /**
       * 如果使用appendChild方法会将原来的dom树中的节点添加到虚拟的节点对象中，
       * 并且会删除原来的节点
       */
      fragment.appendChild(child)
    }
    return fragment
  }
}

// 指令集合
const compileUtil = {
  text(node, vm, exp) { 
    const data = Util.getVal(vm, exp)
    updater.textUpdater(node, data)
  },
  html(node, vm, exp) { 
    const data = Util.getVal(vm, exp)
    updater.htmlUpdater(node, data)
  },
  model(node, vm, exp) { 
    this.bind(node, vm, exp, "value")
    let val = Util.getVal(vm, exp)
    node.addEventListener("input", (e) => { 
      const newVal = e.target.value
      if (newVal != val) {
        val = newVal
        Util.setVal(vm, exp, newVal)
      }
      console.log(Util.getVal(vm, exp))
    })
  },
  class() { 

  },
  bind(node, vm, exp, eventName) { 
    const data = Util.getVal(vm, exp)
    node.setAttribute(eventName, data)
  },
  // 事件处理
  eventHandler(node, vm, exp, eventName) { 
    const fn = vm.$options.methods && vm.$options.methods[exp]
    if (fn && eventName) { 
      node.addEventListener(eventName, fn.bind(vm), false)
    }
  }
}

// 更新dom的操作集合
const updater = {
  textUpdater(node, val) {
    if (node && val) { 
      node.textContent = val
    }
  },
  htmlUpdater(node, val) { 
    if (node && val) { 
      node.innerHTML = val
    }
  },
  classUpdater() { 

  },
  modelUpdater() { 
    
  }
}