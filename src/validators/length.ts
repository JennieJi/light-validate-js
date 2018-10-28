/**
 * @requires Validator.validator.Number
 * @requires Validator.validator.NumberRange
 */
import NumberValidator from './number';
import NumberRange from './number-range';

export interface ILengthHash {
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
export default function(value: any, hash: ILengthHash = {}): boolean {
  const { min: passedMin, max: passedMax, excludeEdge } = hash;

  if (!value && typeof value !== 'number' && typeof value !== 'boolean') {
    value = '';
  }

  const length = value.length || value.toString().length;
  const min = NumberValidator(passedMin) ? parseFloat(passedMin.toString()) : 0;
  const max = NumberValidator(passedMax)
    ? parseFloat(passedMax.toString())
    : Infinity;
  return NumberRange(length, { min, max, excludeEdge });
}
