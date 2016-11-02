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

<a name="validate"></a>

## validate(value, validators) ⇒ <code>[ValidatePromise](#ValidatePromise)</code>
**Kind**: global function  
**Access:** public  

| Param | Type |
| --- | --- |
| value |  | 
| validators | <code>[Array.&lt;Validator&gt;](#Validator)</code> | 

**Example**  
```js
validate('jennie.ji@shopeemobile.com', [
	[length, {min: 0}],
	[email]
]);
```
<a name="groupValidate"></a>

## groupValidate(group, [exitOnceError]) ⇒ <code>[ValidatePromise](#ValidatePromise)</code>
**Kind**: global function  
**Access:** public  

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

## Validator : <code>object</code> &#124; <code>Array.&lt;(function()\|object)&gt;</code>
Validator

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| Validator.validator | <code>function</code> | 
| Validator.parameters | <code>Array</code> | 
| Validator.errorMessage | <code>string</code> | 

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

