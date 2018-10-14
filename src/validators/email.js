/**
 * @requires Validator.validator.Regular
 */
import Regular from './regular';

/**
 * @member Validator.validator
 * @method Email
 * @param value {}
 * @return {boolean}
 */
export default function(value) {
  return Regular(value, {
    regular: /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|world|xxx|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
  });
}
