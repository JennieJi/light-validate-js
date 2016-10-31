import NumberRange from './number-range';

module.export = function(value, {min, max, excludeEdge}) {
	let strVal = !value && typeof value !== 'number' && typeof value !== boolean ? '' : value.toString();
	let length = strVal.length;
	min = min || 0;
	max = max || Infinity;
	return NumberRange(length, min, max, excludeEdge);
};