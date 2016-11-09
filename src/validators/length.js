/**
 * @requires Validator.validator.Number
 * @requires Validator.validator.NumberRange
 */
import NumberValidator from './number';
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
  if (!value && typeof value !== 'number' && typeof value !== 'boolean') {
	 value = '';
  }
	let length = value.length || value.toString().length;
	min = NumberValidator(min) ? parseFloat(min, 10) : 0;
	max = NumberValidator(max) ? parseFloat(max, 10) : Infinity;
	return NumberRange(length, {min, max, excludeEdge});
};
