module.exports =
/******/ (function(modules) { // webpackBootstrap
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
	 * Validate
	 * @author Jennie Ji - jennie.ji@shopeemobile.com
	 * 
	 * @todo Promise compatibility
	 */

	/**
	 * Validator
	 * @typedef Validator {Array.<function|object>}	First parameter is the validator function, following by parameters
	 */
	/**
	 * ValidatePromise
	 * ValidatePromise.then() - Valid
	 * ValidatePromise.catch(errors) - Invalid
	 * errors - can be normal exceptions, or an Array of {@link ValidateError}
	 * @typedef ValidatePromise {Promise}
	 */
	/**
	 * ValidateError
	 * @typedef ValidateError {object}
	 * @prop ValidateError.validator {function} validate function
	 * @prop ValidateError.parameters {Array} validate function parameters
	 * @prop ValidateError.error {} Original error response
	 */

	/**
	 * @public
	 * @function
	 * @param value 		{}
	 * @param validators 	{Array.<Validator>}
	 * @return 			{ValidatePromise}
	 * @example
	 * 	validate('jennie.ji@shopeemobile.com', [
	 *			[length, {min: 0}],
	 *			[email]
	 * 	]);
	 */
	function validate(value, validators) {
		if (Array.isArray(validators)) {
			var validatorsLen = validators.length;
			var validatePromises = [];

			var _loop = function _loop(i) {
				var _validators$i = _toArray(validators[i]);

				var validator = _validators$i[0];

				var params = _validators$i.slice(1);

				if (typeof validator !== 'function') {
					// TODO: throw meaniful error
					throw '';
				} else {
					var promise = Promise.resolve(validator.apply(undefined, [value].concat(_toConsumableArray(params))));
					validatePromises.push(promise.then(function (result) {
						if (result) {
							return true;
						}
						// to deal with this in catch
						throw '';
					}).catch(function (error) {
						throw {
							validator: validator,
							parameters: params,
							error: error
						};
					}));
				}
			};

			for (var i = 0; i < validatorsLen; i++) {
				_loop(i);
			}
			return Promise.all(validatePromises).then(function () {
				return true;
			}).catch(function (err) {
				throw err;
			});
		} else {
			// TODO: throw meaniful error
			throw '';
		}
	}

	/**
	 * @public
	 * @function
	 * @param group 			 	{Object.<object>}
	 * @param [exitOnceError=true] 	{boolean}
	 * @return						{ValidatePromise}
	 * @example
	 *		groupValidate({
	 *			name: {
	 *				value: 'Jennie',
	 *				validators: [
	 *					[length, {min: 3, max: 50}]
	 *				]
	 *			},
	 *			email: {
	 *				value: 'jennie.ji@shopeemobile.com',
	 *				validators: [
	 *					[length, {min: 0}],
	 *					[email]
	 *				]
	 *			}
	 * 		});
	 */
	function groupValidate(group) {
		var exitOnceError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

		if ((typeof group === 'undefined' ? 'undefined' : _typeof(group)) !== 'object') {
			// TODO: throw meaniful error
			throw '';
		}
		var validatePromises = [];

		var _loop2 = function _loop2(name) {
			if ((typeof group === 'undefined' ? 'undefined' : _typeof(group)) !== 'object') {
				// TODO: throw meaniful error
				throw '';
			}
			var _group$name = group[name];
			var value = _group$name.value;
			var validators = _group$name.validators;

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
		return Promise.all(validatePromises).then(function (result) {
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

	module.exports = {
		validate: validate,
		groupValidate: groupValidate
	};

/***/ }
/******/ ]);