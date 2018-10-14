/**
 * Validator.validator
 */
import Regular from './regular';
import NumberValidator from './number';
import NumberRange from './number-range';
import Length from './length';
import Email from './email';

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
