/**
 * @method Regular
 * @param value {}
 * @param hash {object}
 * @prop hash.regular {RegExp}
 * @return {boolean}
 */
export default function(value, hash = {}) {
  let { regular } = hash;
  if (regular instanceof RegExp) {
    return regular.test(value);
  }
  return false;
}
