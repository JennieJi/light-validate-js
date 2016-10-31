/**
 * Validate
 * @author Jennie Ji - jennie.ji@hotmail.com
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
  * errors - can be normal exceptions, or an Array of validate error
  * errors.validator - validate function name
  * errors.parameters - validate function parameters
  * @typedef ValidatePromise {Promise}
  */

 /**
  * @param value 		{}
  * @param validators 	{Array.<Validator>}
  * @return 			{ValidatePromise}
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
				}).catch(() => {
					throw {
						validator: validator.name,
						parameters: params
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
 * @param group 			 	{Object.<object>}
 * @param [exitOnceError=true] 	{boolean}
 * @return						{ValidatePromise}
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

module.export = {
	validate,
	groupValidate
};