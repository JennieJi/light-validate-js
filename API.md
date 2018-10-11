## Modules

<dl>
<dt><a href="#Validator.module_validate">validate</a></dt>
<dd></dd>
<dt><a href="#Validator.module_validator">validator</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#validate">validate(value, validators)</a> ⇒ <code><a href="#ValidatePromise">ValidatePromise</a></code></dt>
<dd></dd>
<dt><a href="#groupValidate">groupValidate(group, [exitOnceError])</a> ⇒ <code><a href="#ValidatePromise">ValidatePromise</a></code></dt>
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
validate('jennie.ji@shopeemobile.com', [
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
		value: 'jennie.ji@shopeemobile.com',
		validators: [
			[length, {min: 0}],
			[email]
		]
	}
});
```
<a name="Validator.module_validator"></a>

## validator
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
validate('jennie.ji@shopeemobile.com', [
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
		value: 'jennie.ji@shopeemobile.com',
		validators: [
			[length, {min: 0}],
			[email]
		]
	}
});
```
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

