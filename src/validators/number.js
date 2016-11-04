/**
 * @member Validator.validator
 * @method Number
 * @param value {}
 * @return {boolean}
 */
module.exports = function (value) {
	return value!== null && (isFinite(value) || typeof value === 'number' && !isNaN(value));
};