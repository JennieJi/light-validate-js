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
	if (typeof value !== 'number') { return false; }
	let {min, max, excludeEdge} = hash;
	min = typeof min === 'number' ? min : -Infinity;
	max = typeof max === 'number' ? max : Infinity;
	return value > min && value < max || !excludeEdge &&  (value === min || value === max);
};