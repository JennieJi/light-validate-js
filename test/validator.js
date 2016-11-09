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
	var Length = Validators.Length;
	describe('Without options', function() {
    it('empty string', function() {
      assert.ok(Length(''));
    });
    it('number', function() {
      assert.ok(Length(123));
    });
    it('undefined', function() {
      assert.ok(Length(void 0));
    });
    it('boolean false', function() {
      assert.ok(Length(false));
    });
    it('boolean true', function() {
      assert.ok(Length(true));
    });
    it('empty array', function() {
      assert.ok(Length([]));
    });
    it('non-empty array', function() {
      assert.ok(Length([1,2,3]));
    });
	});
	describe('Set min 3', function() {
    var options = {min: 3};
    it('empty string', function() {
      assert.equal(Length('', options), false);
    });
    it('number 123', function() {
      assert.ok(Length(123, options));
    });
    it('undefined', function() {
      assert.equal(Length(void 0, options), false);
    });
    it('boolean false', function() {
      assert.ok(Length(false, options));
    });
    it('boolean true', function() {
      assert.ok(Length(true, options));
    });
    it('empty array', function() {
      assert.equal(Length([], options), false);
    });
    it('non-empty array [1,2,3]', function() {
      assert.ok(Length([1,2,3], options));
    });
	});
	describe('Set max 3', function() {
    var options = {max: 3};
    it('empty string', function() {
      assert.ok(Length('', options));
    });
    it('number 123', function() {
      assert.ok(Length(123, options));
    });
    it('number 1234', function() {
      assert.equal(Length(1234, options), false);
    });
    it('undefined', function() {
      assert.ok(Length(void 0, options));
    });
    it('boolean false', function() {
      assert.equal(Length(false, options), false);
    });
    it('boolean true', function() {
      assert.equal(Length(true, options), false);
    });
    it('empty array', function() {
      assert.ok(Length([], options));
    });
    it('non-empty array [1,2,3]', function() {
      assert.ok(Length([1,2,3], options));
    });
	});
	describe('set excludeEdge true, min 3, max 4', function() {
    var options = {min: 2, max: 4, excludeEdge: true};
    it('empty string', function() {
      assert.equal(Length('', options), false);
    });
    it('number 123', function() {
      assert.ok(Length(123, options));
    });
    it('number 1234', function() {
      assert.equal(Length(1234, options), false);
    });
    it('undefined', function() {
      assert.equal(Length(void 0, options), false);
    });
    it('boolean false', function() {
      assert.equal(Length(false, options), false);
    });
    it('boolean true', function() {
      assert.equal(Length(true, options), false);
    });
    it('empty array', function() {
      assert.equal(Length([], options), false);
    });
    it('non-empty array [1,2,3]', function() {
      assert.ok(Length([1,2,3], options));
    });
	});
});

describe('Validator - regular', function() {
	let {Regular} = Validators;
});

describe('Validator - email', function() {
	let {Email} = Validators;
});
