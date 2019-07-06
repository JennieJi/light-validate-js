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

## Modules

<dl>
<dt><a href="#Validator.module_validate">validate</a></dt>
<dd></dd>
<dt><a href="#Validator.module_validator">validator</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#regular_1">regular_1</a></dt>
<dd></dd>
<dt><a href="#email_1">email_1</a></dt>
<dd><p>Validator.validator</p>
</dd>
<dt><a href="#number_1">number_1</a></dt>
<dd></dd>
<dt><a href="#number_1">number_1</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#validate">validate(value, validators)</a> ⇒ <code><a href="#ValidatePromise">ValidatePromise</a></code></dt>
<dd></dd>
<dt><a href="#groupValidate">groupValidate(group, [exitOnceError])</a> ⇒ <code><a href="#ValidatePromise">ValidatePromise</a></code></dt>
<dd></dd>
<dt><a href="#Email">Email(value)</a> ⇒ <code>boolean</code></dt>
<dd></dd>
<dt><a href="#Length">Length(value, hash)</a> ⇒ <code>boolean</code></dt>
<dd></dd>
<dt><a href="#NumberRange">NumberRange(value, hash)</a> ⇒ <code>boolean</code></dt>
<dd></dd>
<dt><a href="#Number">Number(value)</a> ⇒ <code>boolean</code></dt>
<dd></dd>
<dt><a href="#Regular">Regular(value, hash)</a> ⇒ <code>boolean</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Validator">Validator</a> : <code>object</code> | <code>Array.&lt;(function()|object)&gt;</code></dt>
<dd><p>Validator</p>
</dd>
<dt><a href="#ValidateError">ValidateError</a> : <code>object</code></dt>
<dd><p>ValidateError</p>
</dd>
<dt><a href="#ValidatePromise">ValidatePromise</a> : <code>Promise</code></dt>
<dd><p>ValidatePromise</p>
</dd>
</dl>

<a name="Validator.module_validate"></a>

## validate

* [validate](#Validator.module_validate)
    * [.validate(value, validators)](#Validator.module_validate.validate) ⇒ [<code>ValidatePromise</code>](#ValidatePromise)
    * [.groupValidate(group, [exitOnceError])](#Validator.module_validate.groupValidate) ⇒ [<code>ValidatePromise</code>](#ValidatePromise)

<a name="Validator.module_validate.validate"></a>

### validate.validate(value, validators) ⇒ [<code>ValidatePromise</code>](#ValidatePromise)
**Kind**: static method of [<code>validate</code>](#Validator.module_validate)  
**Access**: protected  

| Param | Type |
| --- | --- |
| value |  | 
| validators | [<code>Array.&lt;Validator&gt;</code>](#Validator) | 

**Example**  
```js
validate('jennie.ji@hotmail.com', [
 [length, {min: 0}],
 [email]
]);
```
<a name="Validator.module_validate.groupValidate"></a>

### validate.groupValidate(group, [exitOnceError]) ⇒ [<code>ValidatePromise</code>](#ValidatePromise)
**Kind**: static method of [<code>validate</code>](#Validator.module_validate)  
**Access**: protected  

| Param | Type | Default |
| --- | --- | --- |
| group | <code>Object.&lt;object&gt;</code> |  | 
| [exitOnceError] | <code>boolean</code> | <code>true</code> | 

**Example**  
```js
groupValidate({
name: {
   value: 'Jennie',
   validators: [
     [length, {min: 3, max: 50}]
   ]
 },
 email: {
   value: 'jennie.ji@hotmail.com',
   validators: [
     [length, {min: 0}],
     [email]
   ]
 }
});
```
<a name="Validator.module_validator"></a>

## validator
<a name="regular_1"></a>

## regular\_1
**Kind**: global constant  
**Requires**: <code>module:Validator.validator.Regular</code>  
<a name="email_1"></a>

## email\_1
Validator.validator

**Kind**: global constant  
<a name="number_1"></a>

## number\_1
**Kind**: global constant  
**Requires**: <code>module:Validator.validator.Number</code>, <code>module:Validator.validator.NumberRange</code>  
<a name="number_1"></a>

## number\_1
**Kind**: global constant  
**Requires**: <code>module:Validator.validator.Number</code>  
<a name="validate"></a>

## validate(value, validators) ⇒ [<code>ValidatePromise</code>](#ValidatePromise)
**Kind**: global function  
**Access**: protected  

| Param | Type |
| --- | --- |
| value |  | 
| validators | [<code>Array.&lt;Validator&gt;</code>](#Validator) | 

**Example**  
```js
validate('jennie.ji@hotmail.com', [
 [length, {min: 0}],
 [email]
]);
```
<a name="groupValidate"></a>

## groupValidate(group, [exitOnceError]) ⇒ [<code>ValidatePromise</code>](#ValidatePromise)
**Kind**: global function  
**Access**: protected  

| Param | Type | Default |
| --- | --- | --- |
| group | <code>Object.&lt;object&gt;</code> |  | 
| [exitOnceError] | <code>boolean</code> | <code>true</code> | 

**Example**  
```js
groupValidate({
name: {
   value: 'Jennie',
   validators: [
     [length, {min: 3, max: 50}]
   ]
 },
 email: {
   value: 'jennie.ji@hotmail.com',
   validators: [
     [length, {min: 0}],
     [email]
   ]
 }
});
```
<a name="Email"></a>

## Email(value) ⇒ <code>boolean</code>
**Kind**: global function  

| Param | Description |
| --- | --- |
| value | any |

<a name="Length"></a>

## Length(value, hash) ⇒ <code>boolean</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value |  | any |
| hash | <code>object</code> |  |

**Properties**

| Name | Type |
| --- | --- |
| hash.min | <code>number</code> | 
| hash.max | <code>number</code> | 
| hash.excludeEdge | <code>boolean</code> | 

<a name="NumberRange"></a>

## NumberRange(value, hash) ⇒ <code>boolean</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value |  | any |
| hash | <code>object</code> |  |

**Properties**

| Name | Type |
| --- | --- |
| hash.min | <code>number</code> | 
| hash.max | <code>number</code> | 
| hash.excludeEdge | <code>boolean</code> | 

<a name="Number"></a>

## Number(value) ⇒ <code>boolean</code>
**Kind**: global function  

| Param | Description |
| --- | --- |
| value | any |

<a name="Regular"></a>

## Regular(value, hash) ⇒ <code>boolean</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value |  | any |
| hash | <code>object</code> |  |

**Properties**

| Name | Type |
| --- | --- |
| hash.regular | <code>RegExp</code> | 

<a name="Validator"></a>

## Validator : <code>object</code> \| <code>Array.&lt;(function()\|object)&gt;</code>
Validator

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Validator.validator | <code>function</code> | Validator function will always take validate value as 1st parameter. If it return true or promise resolve as true, means validate pass. If it return string or promise resolve as string, result will be treated as error message. All the other results will be passed to [ValidateError.error](ValidateError.error). |
| Validator.parameters | <code>Array</code> | Optional. Extra parameters for [Validator.validator](Validator.validator). |
| Validator.errorMessage | <code>string</code> | Optional. Expected to be deprecated someday, since it's not as flexible as return error message by validator function directly (this is added in 0.0.2). |

<a name="ValidateError"></a>

## ValidateError : <code>object</code>
ValidateError

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| ValidateError.validator | <code>function</code> | validate function |
| ValidateError.parameters | <code>Array</code> | validate function parameters |
| ValidateError.error |  | Original error response |
| ValidateError.errorMessage | <code>string</code> | predefined error message |
| Validator.name | <code>string</code> | only exists in group validate |

<a name="ValidatePromise"></a>

## ValidatePromise : <code>Promise</code>
ValidatePromise

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| ValidatePromise.then | <code>function</code> | Valid |
| ValidatePromise.catch | <code>funciton</code> | Invalid. Parameter: errors - can be normal exceptions, or single/array of [ValidateError](#ValidateError) |

