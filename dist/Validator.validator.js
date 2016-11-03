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

	var _numberRange = __webpack_require__(2);

	var _numberRange2 = _interopRequireDefault(_numberRange);

	var _length = __webpack_require__(3);

	var _length2 = _interopRequireDefault(_length);

	var _email = __webpack_require__(4);

	var _email2 = _interopRequireDefault(_email);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @module Validator.validator
	 */
	/**
	 * Validator.validator
	 * @author Jennie Ji - jennie.ji@hotmail.com
	 */
	module.exports = {
	  Regular: _regular2.default,
	  NumberRange: _numberRange2.default,
	  Length: _length2.default,
	  Email: _email2.default
	};

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
	    regular.test(value);
	  }
	  return false;
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

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

	  if (typeof value !== 'number') {
	    return false;
	  }
	  var min = hash.min;
	  var max = hash.max;
	  var excludeEdge = hash.excludeEdge;

	  min = min || -Infinity;
	  max = max || Infinity;
	  return value > min && value < max || !excludeEdge && (value === min || value === max);
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _numberRange = __webpack_require__(2);

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
	module.exports = function (value) {
	  var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var min = hash.min;
	  var max = hash.max;
	  var excludeEdge = hash.excludeEdge;

	  var strVal = !value && typeof value !== 'number' && typeof value !== 'boolean' ? '' : value.toString();
	  var length = strVal.length;
	  min = min || 0;
	  max = max || Infinity;
	  return (0, _numberRange2.default)(length, { min: min, max: max, excludeEdge: excludeEdge });
	}; /**
	    * @requires Validator.validator.NumberRange
	    */

/***/ },
/* 4 */
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