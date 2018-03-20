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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	__webpack_require__.p = "./";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./docs/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./docs/index.js":
/*!***********************!*\
  !*** ./docs/index.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_MVVM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/MVVM */ \"./src/MVVM.js\");\n\n\nvar vm = new _src_MVVM__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n    el: '#mvvm-app',\n    data: {\n        someStr: 'hello',\n        className: 'btn',\n        htmlStr: '<span style=\"color: #f00\">red</span>',\n        child: {\n            someStr: 'World!'\n        }\n    },\n    computed: {\n        getHelloWorld: function () {\n            return this.someStr + this.child.someStr;\n        }\n    },\n    methods: {\n        clickBtn: function (e) {\n            var randomStrArr = ['childOne', 'childTwo', 'childThree'];\n            this.child.someStr = randomStrArr[parseInt(Math.random() * 3)];\n        }\n    }\n});\nvm.$watch('child.someStr', function () {\n    console.log(arguments);\n});\n\n//# sourceURL=webpack:///./docs/index.js?");

/***/ }),

/***/ "./src/Compile.js":
/*!************************!*\
  !*** ./src/Compile.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Compile; });\nclass Compile {\n\n    constructor() {\n        const fragment = this.node2Fragment(el);\n        el.appendChild(fragment);\n    }\n\n    node2Fragment(el) {\n        const fragment = document.createDocumentFragment();\n        return fragment;\n    }\n\n}\n\n//# sourceURL=webpack:///./src/Compile.js?");

/***/ }),

/***/ "./src/MVVM.js":
/*!*********************!*\
  !*** ./src/MVVM.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MVVM; });\n/* harmony import */ var _Compile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Compile */ \"./src/Compile.js\");\n\n\nclass MVVM {\n\n    constructor(options) {\n        new _Compile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](options.el || document.body, this);\n    }\n}\n\n//# sourceURL=webpack:///./src/MVVM.js?");

/***/ })

/******/ });