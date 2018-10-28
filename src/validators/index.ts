/**
 * Validator.validator
 */
import Email from './email';
import Length from './length';
import NumberValidator from './number';
import NumberRange from './number-range';
import Regular from './regular';

/**
 * @module Validator.validator
 */
export default {
  Regular,
  Number: NumberValidator,
  NumberRange,
  Length,
  Email
};
