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
		const validatorsLen = validators.length;
		let validatePromises = [];
		for (let i = 0; i < validatorsLen; i ++) {
			let validatorConf = validators[i];
			let validator;
			let parameters;
			let errorMessage;
			if (Array.isArray(validatorConf)) {
				[validator, ...parameters] = validatorConf;
			} else {
				validator = validatorConf.validator;
				parameters = validatorConf.parameters || [];
				errorMessage = validatorConf.errorMessage;
			}
			if (typeof validator !== 'function') {
				throw `Validator "${validator}" must be a function!`;
			} else {
				let promise = Promise.resolve(validator(value, ...parameters));
				validatePromises.push(promise.then(result => {
					if (result) {
						return true;
					}
					// to deal with this in catch
					throw '';
				}).catch(error => {
					throw {
						validator,
						parameters,
						errorMessage,
						error
					};
				}));
			}
		}
		return Promise.all(validatePromises).then(() => true).catch(err => {
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
function groupValidate(group, exitOnceError = true) {
	if (typeof group !== 'object') {
		throw 'Validate group should be an object!';
	}
	let validatePromises = [];
	for (let name in group) {
		let field = group[name];
		if (typeof field !== 'object') {
			throw 'Validate group item should be an object!';
		} 
		let {value, validators} = field;
		let validatePromise = validate(value, validators);
		validatePromises.push(validatePromise.catch(err => {
			err.name = name;
			if (exitOnceError) {
				throw err;
			} else {
				return error;
			}
		}));
	}
	return Promise.all(validatePromises).then(result => {
		if (!exitOnceError) {
			let errors = result.filter(res => res !== true);
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
	validate,
	groupValidate
};