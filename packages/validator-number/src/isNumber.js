/**
 * @member Validator.validator
 * @method Number
 * @param value {}
 * @return {boolean}
 */
export default function isNumber(value) {
  return typeof value === 'number' && !isNaN(value) || /^[+-]?\d+(\.\d+)?$/.test(value);
}