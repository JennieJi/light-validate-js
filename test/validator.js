var assert = require('assert');
var Validators = require('../dist/Validator.validator.js');

describe('Validator - number range', function() {
	var NumberRange = Validators.NumberRange;
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
	it('Set min', function() {

	});
	it('Set max', function() {

	});
	it('set excludeEdge', function() {

	});
});

describe('Validator - length', function() {
	let {Length} = Validators;
	it('Without options', function() {
	});
	it('Set min', function() {

	});
	it('Set max', function() {

	});
	it('set excludeEdge', function() {

	});
});

describe('Validator - regular', function() {
	let {Regular} = Validators;
});

describe('Validator - email', function() {
	let {Email} = Validators;
});