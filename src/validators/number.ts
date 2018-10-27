/**
 * @member Validator.validator
 * @method Number
 * @param value any
 * @return {boolean}
 */
export default function(value: any): boolean {
  return (
    value !== null &&
    (isFinite(value) || (typeof value === 'number' && !isNaN(value)))
  );
}
