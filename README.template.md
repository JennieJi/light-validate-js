[![npm version](https://badge.fury.io/js/light-validate-js.svg)](https://badge.fury.io/js/light-validate-js)
[![Build Status](https://travis-ci.org/JennieJi/lazy-jest.svg?branch=master)](https://travis-ci.org/JennieJi/lazy-jest)
[![codecov](https://codecov.io/gh/JennieJi/lazy-jest/branch/master/graph/badge.svg)](https://codecov.io/gh/JennieJi/lazy-jest)

# Light Validate JS

This package provides light weight flexible JS validate helpers, supports async and group validation.

My goal for this repo is to avoid the binding of error messages & DOM elements and validations which would be more flexible to be used everywhere.

## Installation

**Light Validate JS** module is available on the [npm registry](https://www.npmjs.com/package/light-validate-js) and can be installed using the

```bash
npm install light-validate-js
```

## Example usage

- RSVP setting:

```javascript
Validator.validate.Promise = Promise;
```

- To validate a single field

```Javascript
/**
 * 1st parameter is the value you want to validate,
 * 2nd parameter is the validator, which will carry
 * out the validations one by one basing on the
 * given order.
 *
 * It stops once one of the validations fail
 */
var validatePromise = Validator.validate.validate(fieldValue, [

    // You can pass an array [validateFunc, ...parameters]
    [function(value, param1, param2) {
        // validate pass
        return true;
    }, param1, param2],

    // Or pass an object like following:
    {
        validator: function(value, param1) {
            // validate fail
            return false;
        },
        parameters: [param1],
        errorMessage: 'This is error message!'
    },

    // validate fail and return error message directly
    [function() {
        return 'This is error message!';
    }],
    {
        validator: function(param1) {
            return 'This is error message!';
        },
        parameters: [param1]
    },

    // Async validate success
    [function() {
        return Promise.resolve(true);
    }],
    // Async validate fail
    [function() {
        return Promise.resolve(false);
    }],
    [function() {
        return Promise.resolve('This is error message!');
    }],
    [function() {
        return Promise.reject('This is error message!');
    }]
]);

validatePromise.then(function() {
    alert('Validate pass!');
}).catch(function(error) {
    alert(error.errorMessage);
});
```

- To validate multiple fields

```Javascript
var validatePromise = Validator.validate.groupValidate({
    username: {
        value: 'jennie',
        validators: [
            [Validator.validator.Length, {min: 3, max: 10}]
        ]
    },
    email: {
        value: 'jennie.ji@hotmail.com',
        validators: [
            {
                validator: Validator.validator.Email,
                parameters: null,
                errorMessage: 'This is error message!'
            }
        ]
    }
}, isExitOnceError);

validatePromise.then(function() {
    alert('Validate pass!');
}).catch(function(errors) {
    alert(errors.map(function(err) {
        return err.name + ': ' + err.errorMessage;
    }).join('\n'));
});
```

## Development Setup

- download and install [NodeJS](https://nodejs.org/en/download/)
- run `npm install`
- run the tests using `npm test`
- regenerate document: `npm run docs`

## Development

Install [nodeJs](https://nodejs.org) and run `$: npm install`.  
Build to _/disc_: `$: npm run build`   
Run unit testing: `$: npm test`    
Regenerate document: `$: npm run docs`

## API

{{>main}}