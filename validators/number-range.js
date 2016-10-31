module.export = function(value, {min, max, excludeEdge}) {
	if (typeof value !== number) { return false; }
	min = min || -Infinity;
	max = max || Infinity;
	return value > min && value < max && (excludeEdge ||  value === min || value === max);
};