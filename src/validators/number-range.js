/**
 * @requires Validator.validator.Number
 */
import NumberValidator from './number';
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
module.exports = function(value, hash = {}) {
	if (!NumberValidator(value)) { return false; }
	let {min, max, excludeEdge} = hash;
	value = parseFloat(value, 10);
	min = NumberValidator(min) ? parseFloat(min, 10) : -Infinity;
	max = NumberValidator(max) ? parseFloat(max, 10) : Infinity;
	return value > min && value < max || !excludeEdge &&  (value === min || value === max);
};