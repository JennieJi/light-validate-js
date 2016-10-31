## Functions

<dl>
<dt><a href="#validate">validate(value, validators)</a> ⇒ <code><a href="#ValidatePromise">ValidatePromise</a></code></dt>
<dd></dd>
<dt><a href="#groupValidate">groupValidate(group, [exitOnceError])</a> ⇒ <code><a href="#ValidatePromise">ValidatePromise</a></code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Validator">Validator</a> : <code>Array.&lt;(function()|object)&gt;</code></dt>
<dd><p>Validator</p>
</dd>
<dt><a href="#ValidatePromise">ValidatePromise</a> : <code>Promise</code></dt>
<dd><p>ValidatePromise
ValidatePromise.then() - Valid
ValidatePromise.catch(errors) - Invalid
errors - can be normal exceptions, or an Array of validate error
errors.validator - validate function name
errors.parameters - validate function parameters</p>
</dd>
</dl>

<a name="validate"></a>

## validate(value, validators) ⇒ <code>[ValidatePromise](#ValidatePromise)</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| value |  | 
| validators | <code>[Array.&lt;Validator&gt;](#Validator)</code> | 

<a name="groupValidate"></a>

## groupValidate(group, [exitOnceError]) ⇒ <code>[ValidatePromise](#ValidatePromise)</code>
**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| group | <code>Object.&lt;object&gt;</code> |  | 
| [exitOnceError] | <code>boolean</code> | <code>true</code> | 

<a name="Validator"></a>

## Validator : <code>Array.&lt;(function()\|object)&gt;</code>
Validator

**Kind**: global typedef  
<a name="ValidatePromise"></a>

## ValidatePromise : <code>Promise</code>
ValidatePromise
ValidatePromise.then() - Valid
ValidatePromise.catch(errors) - Invalid
errors - can be normal exceptions, or an Array of validate error
errors.validator - validate function name
errors.parameters - validate function parameters

**Kind**: global typedef  
