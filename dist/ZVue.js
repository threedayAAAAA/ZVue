var ZVue =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./core/ZVue.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./core/Compile.js":
/*!*************************!*\
  !*** ./core/Compile.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Compile; });\n/* harmony import */ var _Util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util */ \"./core/Util.js\");\n/*\r\n * @Descripttion: \r\n * @version: \r\n * @Author: \r\n * @Date: 2020-05-16 12:58:03\r\n * @LastEditors: 三天\r\n * @LastEditTime: 2020-05-17 16:53:56\r\n */ \r\n\r\n\r\nclass Compile{ \r\n  constructor(el, vm){ \r\n    this.$vm = vm\r\n    this.$el = this.isElementNode(el) ? el : document.querySelector(el)\r\n    \r\n    // 对dom节点进行编译\r\n    if (this.$el) { \r\n      this.$fragment = this.createFragment(this.$el)\r\n      this.$el.appendChild(this.$fragment)\r\n    }\r\n    console.log(this.$el)\r\n    this.compile(this.$el)\r\n  }\r\n\r\n  /**\r\n   * @method: compile\r\n   * @msg: 将整个文档碎片进行编译\r\n   * @param {DOM} \r\n   * @return: {DOM}\r\n   */\r\n  compile(el) { \r\n    let childs = Array.from(el.childNodes)\r\n    childs.forEach(node => { \r\n      const text = node.textContent\r\n      const reg = /\\{\\{(.*?)\\}\\}/g;\r\n      // 如果node是元素节点,则对node进行编译\r\n      if (this.isElementNode(node)) { \r\n        //console.log(\"元素节点\", node)\r\n        this.compileElement(node)\r\n      }\r\n      // 如果是文本节点则解析节点内的{{}}里的内容\r\n      if (this.isTextNode(node)) { \r\n        //console.log(\"文本节点\", node)\r\n        this.compileText(node)\r\n      }\r\n      // 如果有子节点则对子节点进行递归编译\r\n      if (node.childNodes && node.childNodes.length > 0) { \r\n        this.compile(node)\r\n      }\r\n    })\r\n  }\r\n\r\n  /**\r\n   * @method:compileElement \r\n   * @msg: 编译元素节点 对某节点上的指令进行解析\r\n   * @param {DOM} \r\n   * @return: {type}\r\n   */\r\n  compileElement(node) { \r\n    const nodeAttrs = Array.from(node.attributes)\r\n    nodeAttrs.forEach(attr => { \r\n      const { name: attrName, value: exp } = attr\r\n      console.log(\"====\", attrName, exp)\r\n      // 判断属性是否是指令\r\n      if (this.isDirective(attrName)) { \r\n        const [, dir] = attrName.split(\"-\") // v-html v-on:xxx\r\n        const [dirName, eventName] = dir.split(\":\")\r\n        console.log(dir, dirName, eventName, this.$vm)\r\n        // 事件指令时\r\n        if (this.isEventDirective(attrName)) { \r\n          compileUtil.eventHandler(node, this.$vm, eventName, exp)\r\n        } else {\r\n        // 普通指令时\r\n          compileUtil[dirName] && compileUtil[dirName](node, this.$vm, exp)\r\n        }\r\n        // 在属性里移除该指令\r\n        node.removeAttribute(attr)\r\n      }\r\n    })\r\n\r\n  }\r\n\r\n  /**\r\n   * @method: compileText\r\n   * @msg: 编译文本节点\r\n   * @param {type} \r\n   * @return: {type}\r\n   */\r\n  compileText(node) { \r\n    const reg = /\\{\\{(.*?)\\}\\}/g;\r\n    const text = node.textContent.replace(reg, (...arg) => _Util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getVal(this.$vm, arg[1]))\r\n    updater.textUpdater(node, text)\r\n    //const val = this.$vm.$data[exp]\r\n\r\n  }\r\n\r\n  /**\r\n   * @method: isElementNode\r\n   * @msg: 判断元素是否为元素节点\r\n   * @param {any} el\r\n   * @return: {boolean} \r\n   */\r\n  isElementNode(el) { \r\n    return typeof el === 'object' && el.nodeType === 1\r\n  }\r\n\r\n  /**\r\n   * @method: isTextNode\r\n   * @msg: 判断元素是否为文本节点\r\n   * @param {any} el\r\n   * @return: {boolean} \r\n   */\r\n  isTextNode(el) { \r\n    return typeof el === 'object' && el.nodeType === 3\r\n  }\r\n\r\n  /**\r\n   * @method: isDirective\r\n   * @msg: 根据该属性是否v-开头,判断是否是指令,\r\n   * @param {string} attr\r\n   * @return: {boolean}\r\n   */\r\n  isDirective(attr) { \r\n    return attr.indexOf(\"v-\") === 0\r\n  }\r\n\r\n  /**\r\n   * @method: isEventDirective\r\n   * @msg: 根据该属性是否v-on开头,判断是否是事件指令,\r\n   * @param {string} attr\r\n   * @return: {boolean}\r\n   */\r\n  isEventDirective(attr) { \r\n    return this.isDirective(attr) && attr.indexOf(\"v-on\") === 0\r\n  }\r\n\r\n  /**\r\n   * @method: createFragment\r\n   * @msg: 创建文档碎片,将根节点以及根节点的所有子节点放置于文档碎片中,\r\n   *        减少dom操作,从而减少回流与重绘\r\n   * @param {DOM} \r\n   * @return: {DOM}\r\n   */\r\n  createFragment(el) { \r\n    let fragment = document.createDocumentFragment(),\r\n      child\r\n    while (child = el.firstChild) {\r\n      /**\r\n       * 如果使用appendChild方法会将原来的dom树中的节点添加到虚拟的节点对象中，\r\n       * 并且会删除原来的节点\r\n       */\r\n      fragment.appendChild(child)\r\n    }\r\n    return fragment\r\n  }\r\n}\r\n\r\n// 指令集合\r\nconst compileUtil = {\r\n  text(node, vm, exp) { \r\n    const data = _Util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getVal(vm, exp)\r\n    updater.textUpdater(node, data)\r\n  },\r\n  html(node, vm, exp) { \r\n    const data = _Util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getVal(vm, exp)\r\n    updater.htmlUpdater(node, data)\r\n  },\r\n  model() { \r\n\r\n  },\r\n  class() { \r\n\r\n  },\r\n  bind() { \r\n\r\n  },\r\n  // 事件处理\r\n  eventHandler(node, vm, eventName, exp) { \r\n    const fn = vm.$options.methods && vm.$options.methods[exp]\r\n    if (fn && eventName) { \r\n      node.addEventListener(eventName, fn.bind(vm), false)\r\n    }\r\n  }\r\n}\r\n\r\n// 更新dom的操作集合\r\nconst updater = {\r\n  textUpdater(node, val) {\r\n    if (node && val) { \r\n      node.textContent = val\r\n    }\r\n  },\r\n  htmlUpdater(node, val) { \r\n    if (node && val) { \r\n      node.innerHTML = val\r\n    }\r\n  },\r\n  classUpdater() { \r\n\r\n  },\r\n  modelUpdater() { \r\n    \r\n  }\r\n}\n\n//# sourceURL=webpack://ZVue/./core/Compile.js?");

/***/ }),

/***/ "./core/Util.js":
/*!**********************!*\
  !*** ./core/Util.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\r\n * @Descripttion: \r\n * @version: \r\n * @Author: \r\n * @Date: 2020-05-17 15:18:49\r\n * @LastEditors: 三天\r\n * @LastEditTime: 2020-05-17 15:19:48\r\n */ \r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n  getVal(vm, exp) { // a.b.c\r\n    const segments = exp.split(\".\")\r\n    let res = vm.$data\r\n    for (let i = 0, L = segments.length; i < L; i++) { \r\n      res = res[segments[i]]\r\n      if (!res) return \r\n    }\r\n    return res\r\n  }\r\n});\n\n//# sourceURL=webpack://ZVue/./core/Util.js?");

/***/ }),

/***/ "./core/ZVue.js":
/*!**********************!*\
  !*** ./core/ZVue.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ZVue; });\n/* harmony import */ var _Compile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Compile */ \"./core/Compile.js\");\n/*\r\n * @Descripttion: \r\n * @version: \r\n * @Author: \r\n * @Date: 2020-05-16 12:59:37\r\n * @LastEditors: 三天\r\n * @LastEditTime: 2020-05-17 16:50:46\r\n */\r\n\r\n\r\nclass ZVue { \r\n  constructor(options) { \r\n    this.$options = options || {}\r\n    this.$data = this.$options['data']\r\n    this.$methods = this.$options['methods']\r\n    this.$el = new _Compile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.$options['el'], this)\r\n  }\r\n}\n\n//# sourceURL=webpack://ZVue/./core/ZVue.js?");

/***/ })

/******/ })["default"];