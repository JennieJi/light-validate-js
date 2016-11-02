module.exports = function(value, {regular}) {
	if (regular instanceof RegExp) {
		regular.test(value);
	}
	return false;
};