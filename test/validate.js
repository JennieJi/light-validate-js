var ValidateModule = require('../dist/Validator.validate.js');
var validate = ValidateModule.validate,
	groupValidate = ValidateModule.groupValidate;
var assert = require('assert');

var testValue = 'test';

var valid = function() { return true; };
var invalid = function () { return false; };
var validatorWithParam = function(value, isValid) { return isValid; };
var validGroup = [
		[valid], 
		[validatorWithParam, true], 
		[validatorWithParam, true]
	],	
	invalidGroup = [
		[valid], 
		[invalid], 
		[validatorWithParam, false]
	];

var asyncValid = function() {
	return new Promise(function(resolve, reject) {
		resolve(true);
	});
};
var asyncInvalid = function() {
	return new Promise(function(resolve, reject) {
		resolve(false);
	});
};
var asyncCatch = function() {
	return new Promise(function(resolve, reject) {
		reject('Reject reason');
	});
};
var asyncValidGroup = [[asyncValid], [asyncValid], [asyncValid]],
	asyncInvalidGroup = [[asyncValid], [asyncInvalid], [asyncCatch]];

var assertValid = function(validatePromise) {
	return function(done) {
		validatePromise.then(function(result) {
			assert.equal(result, true);
			done();
		}).catch(err=> {
			done(err)
		});
	};
};
var assertInvalidError = function(result) {
	var keys = Object.keys(result);
	assert.ok(typeof result.validator === 'function');
	assert.ok(Array.isArray(result.parameters));
	assert.ok(keys.includes('error'));
};
var assertInvalid = function(validatePromise) {
	return function(done) {
		validatePromise.then(function(result) {
			done(result);
		}).catch(result => {
			if (result.validator) {
				assertInvalidError(result);
			}
			done();
		});
	};
};
var assertGroupInvalid = function(validatePromise, errorFields) {
	return function(done) {
		validatePromise.then(function(result) {
			done(result);
		}).catch(result => {
			if (Array.isArray(result) && result[0].validator) {
				assert.equal(result.length, errorFields.length);
				result.forEach(function(err) {
					assert.ok(err.name);
					assert.ok(errorFields.includes(err.name));
					assertInvalidError(err);
				});
			}
			done();
		});
	};
};

describe('Single Validate', function() {
	it('Module exists', function() {
		assert.equal(typeof validate, 'function');
	});

	describe('Normal Validate', function() {
		describe('Valid', function() {
			it('1 validator without param', assertValid(validate(testValue, [[valid]])));
			it('1 validator with param', assertValid(validate(testValue, [[validatorWithParam, true]])));
			it('Multiple validator without param', assertValid(validate(testValue, [[valid], [valid], [valid]])));
			it('Multiple validator with param', assertValid(validate(testValue, validGroup)));
		});
		describe('Invalid', function() {
			it('1 validator without param', assertInvalid(validate(testValue, [[invalid]])));
			it('1 validator with param', assertInvalid(validate(testValue, [[validatorWithParam, false]])));
			it('Multiple validator without param', assertInvalid(validate(testValue, [[valid], [invalid], [valid]])));
			it('Multiple validator with param', assertInvalid(validate(testValue, invalidGroup)));
		});
	});

	describe('Async Validate', function() {
		describe('Valid', function() {
			it('1 validator', assertValid(validate(testValue, [[asyncValid]])));
			it('Multiple validator', assertValid(validate(testValue, asyncValidGroup)));
		});
		describe('Invalid', function() {
			it('1 validator and response 200 with false', assertInvalid(validate(testValue, [[asyncInvalid]])));
			it('1 validator and response error', assertInvalid(validate(testValue, [[asyncCatch]])));
			it('Multiple validator includes response 200 with false only', assertInvalid(validate(testValue, [[asyncValid], [asyncInvalid], [asyncValid]])));
			it('Multiple validator includes response error only', assertInvalid(validate(testValue, [[asyncValid], [asyncCatch], [asyncValid]])));
			it('Multiple validator includes 2 kinds of error responses', assertInvalid(validate(testValue, asyncInvalidGroup)));
			it('Multiple validator includes 2 kinds of error responses', assertInvalid(validate(testValue, [[asyncValid], [asyncCatch], [asyncInvalid]])));
		});
	});
});

describe('Group Validate', function() {
	it('Module exists', function() {
		assert.equal(typeof groupValidate, 'function');
	});

	describe('Normal Validate', function() {
		it('Valid', assertValid(groupValidate({
			field1: {value: testValue, validators: validGroup},
			field2: {value: testValue, validators: validGroup}
		})));
		describe('Invalid', function() {
			var group = {
				field1: {value: testValue, validators: validGroup},
				field2: {value: testValue, validators: invalidGroup},
				field3: {value: testValue, validators: invalidGroup}
			};
			it('Exit once error', assertGroupInvalid(groupValidate(group), ['field2']));
			it('Wait for all', assertGroupInvalid(groupValidate(group), ['field2', 'field3']));
		});
	});

	describe('Contains Async Validate', function() {
		it('Valid', assertValid(groupValidate({
			field1: {value: testValue, validators: validGroup},
			field2: {value: testValue, validators: asyncValidGroup}
		})));
		describe('Invalid', function() {
			var group = {
				field1: {value: testValue, validators: validGroup},
				field2: {value: testValue, validators: asyncInvalidGroup},
				field3: {value: testValue, validators: invalidGroup}
			};
			it('Exit once error', assertGroupInvalid(groupValidate(group), ['field2']));
			it('Wait for all', assertGroupInvalid(groupValidate(group), ['field2', 'field3']));
		});
	});
});