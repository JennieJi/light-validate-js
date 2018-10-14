/**
 * @member Validator.validator
 * @method Number
 * @param value {}
 * @return {boolean}
 */
export default function(value) {
  return (
    value !== null &&
    (isFinite(value) || (typeof value === 'number' && !isNaN(value)))
  );
}
