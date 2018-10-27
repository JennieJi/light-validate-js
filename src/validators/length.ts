/**
 * @requires Validator.validator.Number
 * @requires Validator.validator.NumberRange
 */
import NumberValidator from './number';
import NumberRange from './number-range';

export interface LengthHash {
  min?: number;
  max?: number;
  excludeEdge?: boolean;
}

/**
 * @member Validator.validator
 * @method Length
 * @param value any
 * @param hash {object}
 * @prop hash.min {number}
 * @prop hash.max {number}
 * @prop hash.excludeEdge {boolean}
 * @return {boolean}
 */
export default function(value: any, hash: LengthHash = {}): boolean {
  let { min, max, excludeEdge } = hash;
  if (!value && typeof value !== 'number' && typeof value !== 'boolean') {
    value = '';
  }
  let length = value.length || value.toString().length;
  min = NumberValidator(min) ? parseFloat(min.toString()) : 0;
  max = NumberValidator(max) ? parseFloat(max.toString()) : Infinity;
  return NumberRange(length, { min, max, excludeEdge });
}
