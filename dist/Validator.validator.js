(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["validator"] = factory();
	else
		root["Validator"] = root["Validator"] || {}, root["Validator"]["validator"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _regular = __webpack_require__(1);

	var _regular2 = _interopRequireDefault(_regular);

	var _number = __webpack_require__(2);

	var _number2 = _interopRequireDefault(_number);

	var _numberRange = __webpack_require__(3);

	var _numberRange2 = _interopRequireDefault(_numberRange);

	var _length = __webpack_require__(4);

	var _length2 = _interopRequireDefault(_length);

	var _email = __webpack_require__(5);

	var _email2 = _interopRequireDefault(_email);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @module Validator.validator
	 */
	module.exports = {
	  Regular: _regular2.default,
	  Number: _number2.default,
	  NumberRange: _numberRange2.default,
	  Length: _length2.default,
	  Email: _email2.default
	}; /**
	    * Validator.validator
	    * @author Jennie Ji - jennie.ji@hotmail.com
	    */

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * @method Regular
	 * @param value {}
	 * @param hash {object}
	 * @prop hash.regular {RegExp}
	 * @return {boolean}
	 */
	module.exports = function (value) {
	  var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var regular = hash.regular;

	  if (regular instanceof RegExp) {
	    return regular.test(value);
	  }
	  return false;
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @member Validator.validator
	 * @method Number
	 * @param value {}
	 * @return {boolean}
	 */
	module.exports = function (value) {
	  return value !== null && (isFinite(value) || typeof value === 'number' && !isNaN(value));
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _number = __webpack_require__(2);

	var _number2 = _interopRequireDefault(_number);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @member Validator.validator
	 * @method NumberRange
	 * @param value {}
	 * @param hash {object}
	 * @prop hash.min {number}
	 * @prop hash.max {number}
	 * @prop hash.excludeEdge {boolean}
	 * @return {boolean}
	 */
	module.exports = function (value) {
	  var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  if (!(0, _number2.default)(value)) {
	    return false;
	  }
	  var min = hash.min,
	      max = hash.max,
	      excludeEdge = hash.excludeEdge;

	  value = parseFloat(value, 10);
	  min = (0, _number2.default)(min) ? parseFloat(min, 10) : -Infinity;
	  max = (0, _number2.default)(max) ? parseFloat(max, 10) : Infinity;
	  return value > min && value < max || !excludeEdge && (value === min || value === max);
	}; /**
	    * @requires Validator.validator.Number
	    */

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _number = __webpack_require__(2);

	var _number2 = _interopRequireDefault(_number);

	var _numberRange = __webpack_require__(3);

	var _numberRange2 = _interopRequireDefault(_numberRange);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @member Validator.validator
	 * @method Length
	 * @param value {}
	 * @param hash {object}
	 * @prop hash.min {number}
	 * @prop hash.max {number}
	 * @prop hash.excludeEdge {boolean}
	 * @return {boolean}
	 */
	/**
	 * @requires Validator.validator.Number
	 * @requires Validator.validator.NumberRange
	 */
	module.exports = function (value) {
	  var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var min = hash.min,
	      max = hash.max,
	      excludeEdge = hash.excludeEdge;

	  if (!value && typeof value !== 'number' && typeof value !== 'boolean') {
	    value = '';
	  }
	  var length = value.length || value.toString().length;
	  min = (0, _number2.default)(min) ? parseFloat(min, 10) : 0;
	  max = (0, _number2.default)(max) ? parseFloat(max, 10) : Infinity;
	  return (0, _numberRange2.default)(length, { min: min, max: max, excludeEdge: excludeEdge });
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _regular = __webpack_require__(1);

	var _regular2 = _interopRequireDefault(_regular);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @member Validator.validator
	 * @method Email
	 * @param value {}
	 * @return {boolean}
	 */
	module.exports = function (value) {
	  return (0, _regular2.default)(value, {
	    regular: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|world|xxx|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
	  });
	}; /**
	    * @requires Validator.validator.Regular
	    */

/***/ }
/******/ ])
});
;