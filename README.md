Light Validate JS
====
Light weight, flexible JS validate helpers, support async, group validation.    
My goal of this repo is to avoid binding of error message & DOM elements and validations, which would be more flexible to be used everywhere.    

## Get Start
`npm install light-validate-js`     

RSVP setting:    
```Javascript
Validator.validate.Promise = Promise;
```

Single field validate:    
```Javascript
/**
 * 1st parameter is the value you want to validate, 2nd parameter is validators, which will do validate one by one in the order you give and stop at the one failed. 
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

    // validate fail and return error message directly, added since 0.0.2
    [function() {
        return 'This is error message!';
    }],
    {
        validator: function(param1) {
            return 'This is error message!';
        },
        parameters: [param1]
    },

    // Async valdiate success
    [function() {
        return Promise.resolve(true);    
    }],
    // Async valdiate fail
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
    
Group vaidate:
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

## API
See [API document](./API.md)
- validate
- validators: See [Validator document](./VALIDATORS.md)

## Development
Install [nodeJs](https://nodejs.org) and run `$: npm install`.  
Build to _/disc_: `$: npm run build`   
Run unit testing: `$: npm test`    
Regenerate document: `$: npm run docs`
