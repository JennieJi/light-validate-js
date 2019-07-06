export interface IRegularHash {
  regular?: RegExp;
}

/**
 * @method Regular
 * @param value any
 * @param hash {object}
 * @prop hash.regular {RegExp}
 * @return {boolean}
 */
export default function(value: any, hash: IRegularHash = {}): boolean {
  const { regular } = hash;
  if (regular instanceof RegExp) {
    return regular.test(value);
  }
  return false;
}
