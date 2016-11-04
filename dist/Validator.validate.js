(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["validate"] = factory();
	else
		root["Validator"] = root["Validator"] || {}, root["Validator"]["validate"] = factory();
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
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

	/**
	 * Validator.Validate
	 * @author Jennie Ji - jennie.ji@shopeemobile.com
	 */

	/**
	 * Validator
	 * @typedef Validator {object|Array.<function|object>}	If it is array, first parameter is the validator function, following by parameters
	 * @prop Validator.validator {function}
	 * @prop Validator.parameters {Array}
	 * @prop Validator.errorMessage {string}
	 */
	/**
	 * ValidateError
	 * @typedef ValidateError {object}
	 * @prop ValidateError.validator {function} validate function
	 * @prop ValidateError.parameters {Array} validate function parameters
	 * @prop ValidateError.error {} Original error response
	 * @prop ValidateError.errorMessage {string} predefined error message
	 * @prop Validator.name {string} only exists in group validate
	 */
	/**
	 * ValidatePromise
	 * @typedef ValidatePromise {Promise}
	 * @prop ValidatePromise.then {function} Valid    
	 * @prop ValidatePromise.catch {funciton} Invalid. Parameter: errors - can be normal exceptions, or single/array of {@link ValidateError}
	 */

	var promiseProxy = Promise;

	/**
	 * @protected
	 * @function
	 * @param value 		{}
	 * @param validators 	{Array.<Validator>}
	 * @return 				{ValidatePromise}
	 * @example
	 * validate('jennie.ji@shopeemobile.com', [
	 *	[length, {min: 0}],
	 *	[email]
	 *]);
	 */
	function validate(value, validators) {
		if (Array.isArray(validators)) {
			var validatorsLen = validators.length;
			var validatePromises = [];

			var _loop = function _loop(i) {
				var validatorConf = validators[i];
				var validator = void 0;
				var parameters = void 0;
				var errorMessage = void 0;
				if (Array.isArray(validatorConf)) {
					var _validatorConf = _toArray(validatorConf);

					validator = _validatorConf[0];
					parameters = _validatorConf.slice(1);
				} else {
					validator = validatorConf.validator;
					parameters = validatorConf.parameters || [];
					errorMessage = validatorConf.errorMessage;
				}
				if (typeof validator !== 'function') {
					throw 'Validator "' + validator + '" must be a function!';
				} else {
					var promise = promiseProxy.resolve(validator.apply(undefined, [value].concat(_toConsumableArray(parameters))));
					validatePromises.push(promise.then(function (result) {
						if (result) {
							return true;
						}
						// to deal with this in catch
						throw '';
					}).catch(function (error) {
						throw {
							validator: validator,
							parameters: parameters,
							errorMessage: errorMessage,
							error: error
						};
					}));
				}
			};

			for (var i = 0; i < validatorsLen; i++) {
				_loop(i);
			}
			return promiseProxy.all(validatePromises).then(function () {
				return true;
			}).catch(function (err) {
				throw err;
			});
		} else {
			throw 'Second parameter should be a group of validators!';
		}
	}

	/**
	 * @protected
	 * @function
	 * @param group 			 	{Object.<object>}
	 * @param [exitOnceError=true] 	{boolean}
	 * @return						{ValidatePromise}
	 * @example
	 * groupValidate({
	 *	name: {
	 *		value: 'Jennie',
	 *		validators: [
	 *			[length, {min: 3, max: 50}]
	 *		]
	 *	},
	 * 	email: {
	 *		value: 'jennie.ji@shopeemobile.com',
	 *		validators: [
	 *			[length, {min: 0}],
	 *			[email]
	 *		]
	 *	}
	 * });
	 */
	function groupValidate(group) {
		var exitOnceError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

		if ((typeof group === 'undefined' ? 'undefined' : _typeof(group)) !== 'object') {
			throw 'Validate group should be an object!';
		}
		var validatePromises = [];

		var _loop2 = function _loop2(name) {
			var field = group[name];
			if ((typeof field === 'undefined' ? 'undefined' : _typeof(field)) !== 'object') {
				throw 'Validate group item should be an object!';
			}
			var value = field.value;
			var validators = field.validators;

			var validatePromise = validate(value, validators);
			validatePromises.push(validatePromise.catch(function (err) {
				err.name = name;
				if (exitOnceError) {
					throw err;
				} else {
					return error;
				}
			}));
		};

		for (var name in group) {
			_loop2(name);
		}
		return promiseProxy.all(validatePromises).then(function (result) {
			if (!exitOnceError) {
				var errors = result.filter(function (res) {
					return res !== true;
				});
				if (errors.length) {
					throw errors;
				}
			}
			return true;
		});
	}

	/**
	 * @module Validator.validate
	 * @borrows validate
	 * @borrows groupValidate
	 */
	module.exports = {
		Promise: promiseProxy,
		validate: validate,
		groupValidate: groupValidate
	};

/***/ }
/******/ ])
});
;