var assert = require('assert');
var Validators = require('../dist/Validator.validator.js');

describe('Validator - number', function() {
	var NumberValidator = Validators.Number;
	it('Normal string', function() {
		assert.equal(NumberValidator('abc'), false);
	});
	it('Integer', function() {
		assert.ok(NumberValidator(123));
	});
	it('Float', function() {
		assert.ok(NumberValidator(123.5487121021));
	});
	it('Negative float', function() {
		assert.ok(NumberValidator(-123.5487121021));
	});
	it('Poitive float', function() {
		assert.ok(NumberValidator(+123.5487121021));
	});
	it('.1 - expect true', function() {
		assert.equal(NumberValidator(.1), true);
	});
	it('String integer', function() {
		assert.ok(NumberValidator('123'));
	});
	it('String float', function() {
		assert.ok(NumberValidator('123.5487121021'));
	});
	it('String negative float', function() {
		assert.ok(NumberValidator('-123.5487121021'));
	});
	it('String positive float', function() {
		assert.ok(NumberValidator('+123.5487121021'));
	});
	it('Infinity', function() {
		assert.ok(NumberValidator(Infinity));
	});
	it('Positive Infinity', function() {
		assert.ok(NumberValidator(+Infinity));
	});
	it('Negative Infinity', function() {
		assert.ok(NumberValidator(-Infinity));
	});
	it('NaN is not a number', function() {
		assert.equal(NumberValidator(NaN), false);
	});
	it('null is not a number', function() {
		assert.equal(NumberValidator(null), false);
	});
});

describe('Validator - number range', function() {
	var NumberRange = Validators.NumberRange;
	describe('Without options', function() {
		it('Without options -999999999999999999999999', function() {
			assert.ok(NumberRange(-999999999999999999999999));
		});
		it('Without options -999999999999999999999999', function() {
			assert.ok(NumberRange(999999999999999999999999));
		});
		it('Without options 0', function() {
			assert.ok(NumberRange(0));
		});
		it('Without options string', function() {
			assert.equal(NumberRange('ahdhfbakvnadja'), false);
		});
		it('Without options null', function() {
			assert.equal(NumberRange(null), false);
		});
	});
	describe('Set min', function() {
		var params = {
			min: 10
		};
		it('Lower than min', function() {
			assert.equal(NumberRange(8, params), false);
		});
		it('Equal min', function() {
			assert.ok(NumberRange(10, params));
		});
		it('Higher than min', function() {
			assert.ok(NumberRange(12, params));
		});
	});
	describe('Set max', function() {
		var params = {
			max: 10
		};
		it('Lower than max', function() {
			assert.ok(NumberRange(8, params));
		});
		it('Equal max', function() {
			assert.ok(NumberRange(10, params));
		});
		it('Higher than max', function() {
			assert.equal(NumberRange(12, params), false);
		});
	});
	describe('Set excludeEdge true', function() {
		var params = {
			min: 10,
			max: 20,
			excludeEdge: true
		}
		it('Equal min', function() {
			assert.equal(NumberRange(10, params), false);
		});
		it('Equal max', function() {
			assert.equal(NumberRange(20, params), false);
		});
	});
});

describe('Validator - length', function() {
	let {Length} = Validators;
	describe('Without options', function() {
	});
	describe('Set min', function() {

	});
	describe('Set max', function() {

	});
	describe('set excludeEdge', function() {

	});
});

describe('Validator - regular', function() {
	let {Regular} = Validators;
});

describe('Validator - email', function() {
	let {Email} = Validators;
});