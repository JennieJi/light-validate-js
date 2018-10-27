/**
 * @requires Validator.validator.Number
 */
import NumberValidator from './number';

export interface NumberRangeHash {
  min?: number;
  max?: number;
  excludeEdge?: boolean;
}

/**
 * @member Validator.validator
 * @method NumberRange
 * @param value any
 * @param hash {object}
 * @prop hash.min {number}
 * @prop hash.max {number}
 * @prop hash.excludeEdge {boolean}
 * @return {boolean}
 */
export default function(value: any, hash: NumberRangeHash = {}): boolean {
  if (!NumberValidator(value)) {
    return false;
  }
  let { min, max, excludeEdge } = hash;
  value = parseFloat(value);
  min = NumberValidator(min) ? parseFloat(min.toString()) : -Infinity;
  max = NumberValidator(max) ? parseFloat(max.toString()) : Infinity;
  return (
    (value > min && value < max) ||
    (!excludeEdge && (value === min || value === max))
  );
}
