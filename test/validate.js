var ValidateModule = require('../dist/Validator.validate.js');
var validate = ValidateModule.validate,
	groupValidate = ValidateModule.groupValidate;

var valid = function() { return true; };
var invalid = function () { return false; };
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

describe('Single Validate', function() {
	describe('Normal Validate', function() {
		describe('Valid', function() {

		});
		describe('Invalid', function() {

		});
	});

	describe('Async Validate', function() {
		describe('Valid', function() {

		});
		describe('Invalid', function() {
			
		});
	});
});

describe('Group Validate', function() {
	describe('Normal Validate', function() {
		describe('Valid', function() {

		});
		describe('Invalid', function() {
			describe('Exit once error', function() {

			});
			describe('Wait for all', function() {
				
			});
		});
	});

	describe('Contains Async Validate', function() {
		describe('Valid', function() {

		});
		describe('Invalid', function() {
			describe('Exit once error', function() {

			});
			describe('Wait for all', function() {
				
			});
		});
	});
});