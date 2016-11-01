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
 * @typedef ValidatePromise {Promise}
 * @prop ValidatePromise.then {function} Valid    
 * @prop ValidatePromise.catch {funciton} Invalid. Parameter: errors - can be normal exceptions, or single/array of {@link ValidateError}
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
			let [validator, ...params] = validators[i];
			if (typeof validator !== 'function') {
				// TODO: throw meaniful error
				throw '';
			} else {
				let promise = Promise.resolve(validator(value, ...params));
				validatePromises.push(promise.then(result => {
					if (result) {
						return true;
					}
					// to deal with this in catch
					throw '';
				}).catch(error => {
					throw {
						validator: validator,
						parameters: params,
						error
					};
				}));
			}
		}
		return Promise.all(validatePromises).then(() => true).catch(err => {
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
		// TODO: throw meaniful error
		throw '';
	}
	let validatePromises = [];
	for (let name in group) {
		if (typeof group !== 'object') {
			// TODO: throw meaniful error
			throw '';
		}
		let {value, validators} = group[name];
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

module.exports = {
	validate,
	groupValidate
};