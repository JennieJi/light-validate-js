/**
 * Validator.Validate
 * @author Jennie Ji - jennie.ji@hotmail.com
 */

/**
 * Validator
 * @typedef Validator {object|Array.<function|object>}	If it is array, first parameter is the validator function, following by parameters
 * @prop Validator.validator {function} Validator function will always take validate value as 1st parameter. If it return true or promise resolve as true, means validate pass. If it return string or promise resolve as string, result will be treated as error message. All the other results will be passed to {@link ValidateError.error}.
 * @prop Validator.parameters {Array} Optional. Extra parameters for {@link Validator.validator}.
 * @prop Validator.errorMessage {string} Optional. Expected to be deprecated someday, since it's not as flexible as return error message by validator function directly (this is added in 0.0.2).
 */
/**
 * ValidateError
 * @typedef ValidateError {object}
 * @prop ValidateError.validator {function} validate function
 * @prop ValidateError.parameters {Array} validate function parameters
 * @prop ValidateError.error {} Original error response
 * @prop ValidateError.errorMessage {string} predefined error message
 * @prop Validator.name {string} only exists in group validate
 */
/**
 * ValidatePromise
 * @typedef ValidatePromise {Promise}
 * @prop ValidatePromise.then {function} Valid
 * @prop ValidatePromise.catch {funciton} Invalid. Parameter: errors - can be normal exceptions, or single/array of {@link ValidateError}
 */

const promiseProxy = Promise;

export interface IValidatorObjectForm {
  validator: (...rest: any[]) => Promise<boolean>;
  parameters: any[];
  errorMessage?: string;
}

export type ValidatorArrayForm = [
  (...rest: any[]) => Promise<boolean>,
  ...any[]
];

export interface IValidateError {
  validator: (...rest: any[]) => Promise<boolean>;
  parameters: any[];
  error: Error;
  errorMessage: string;
  name?: string;
}

export interface IValueAndValidatorGroup {
  [key: string]: {
    value: any;
    validators: Array<IValidatorObjectForm | ValidatorArrayForm>;
  };
}

/**
 * @protected
 * @function
 * @param value 		{}
 * @param validators 	{Array.<Validator>}
 * @return 				{ValidatePromise}
 * @example
 * validate('jennie.ji@hotmail.com', [
 *  [length, {min: 0}],
 *  [email]
 * ]);
 */
function validate(
  value: any,
  validators: Array<IValidatorObjectForm | ValidatorArrayForm>
) {
  if (Array.isArray(validators)) {
    const validatorsLen = validators.length;
    const validatePromises = [];

    for (let i = 0; i < validatorsLen; i++) {
      const validatorConf = validators[i];
      let validator: (...rest: any[]) => Promise<boolean>;
      let parameters: any[];
      let errorMessage: string;
      if (Array.isArray(validatorConf)) {
        [validator, ...parameters] = validatorConf;
      } else {
        validator = validatorConf.validator;
        parameters = validatorConf.parameters || [];
        errorMessage = validatorConf.errorMessage;
      }
      if (typeof validator !== 'function') {
        throw new Error(`Validator "${validator}" must be a function!`);
      } else {
        const promise = promiseProxy.resolve(validator(value, ...parameters));
        validatePromises.push(
          promise
            .then(result => {
              if (result === true) {
                return true;
              }
              if (typeof result === 'string') {
                errorMessage = result;
              }
              // to deal with this in catch
              throw result;
            })
            .catch(error => {
              throw {
                validator,
                parameters,
                errorMessage,
                error
              } as IValidateError;
            })
        );
      }
    }
    return promiseProxy
      .all(validatePromises)
      .then(() => true)
      .catch(err => {
        throw err;
      });
  } else {
    throw new Error('Second parameter should be a group of validators!');
  }
}

/**
 * @protected
 * @function
 * @param group                 {Object.<object>}
 * @param [exitOnceError=true]  {boolean}
 * @return                      {ValidatePromise}
 * @example
 * groupValidate({
 * name: {
 *    value: 'Jennie',
 *    validators: [
 *      [length, {min: 3, max: 50}]
 *    ]
 *  },
 *  email: {
 *    value: 'jennie.ji@hotmail.com',
 *    validators: [
 *      [length, {min: 0}],
 *      [email]
 *    ]
 *  }
 * });
 */
function groupValidate(
  group: IValueAndValidatorGroup,
  exitOnceError: boolean = true
) {
  if (typeof group !== 'object') {
    throw new Error('Validate group should be an object!');
  }
  const validatePromises = [];

  for (const name in group) {
    if (Object.prototype.hasOwnProperty.call(group, name)) {
      const field = group[name];

      if (typeof field !== 'object') {
        throw new Error('Validate group item should be an object!');
      }
      const { value, validators } = field;
      const validatePromise = validate(value, validators);

      validatePromises.push(
        validatePromise.catch(err => {
          err.name = name;
          if (exitOnceError) {
            throw [err];
          } else {
            return err;
          }
        })
      );
    }
  }

  return promiseProxy.all(validatePromises).then(result => {
    const errors = result.filter(res => res !== true);
    if (errors.length) {
      throw errors;
    }
    return true;
  });
}

/**
 * @module Validator.validate
 * @borrows validate
 * @borrows groupValidate
 */
export default {
  Promise: promiseProxy,
  validate,
  groupValidate
};
