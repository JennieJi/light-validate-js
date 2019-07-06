/**
 * @requires Validator.validator.Number
 */
import NumberValidator from './number';

export interface INumberRangeHash {
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
export default function(value: any, hash: INumberRangeHash = {}): boolean {
  if (!NumberValidator(value)) {
    return false;
  }
  const { min: passedMin, max: passedMax, excludeEdge } = hash;
  value = parseFloat(value);

  const min = NumberValidator(passedMin)
    ? parseFloat(passedMin.toString())
    : -Infinity;
  const max = NumberValidator(passedMax)
    ? parseFloat(passedMax.toString())
    : Infinity;

  return (
    (value > min && value < max) ||
    (!excludeEdge && (value === min || value === max))
  );
}
