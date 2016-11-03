/**
 * @requires Validator.validator.NumberRange
 */
import NumberRange from './number-range';

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
module.exports = function(value, hash = {}) {
	let {min, max, excludeEdge} = hash;
	let strVal = !value && typeof value !== 'number' && typeof value !== 'boolean' ? '' : value.toString();
	let length = strVal.length;
	min = min || 0;
	max = max || Infinity;
	return NumberRange(length, {min, max, excludeEdge});
};