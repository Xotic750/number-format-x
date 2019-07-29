import toNumber from 'to-number-x';
import toInteger from 'to-integer-x';
import numberIsFinite from 'is-finite-x';
import numToString from 'number-to-decimal-form-string-x';
import toStr from 'to-string-x';
import mathClamp from 'math-clamp-x';
import isNil from 'is-nil-x';
var RE = /none/.constructor;
var _ = 0,
    toFixed = _.toFixed,
    numberToString = _.toString;
var _ref = '',
    replace = _ref.replace,
    split = _ref.split,
    strSlice = _ref.slice;
var join = [].join;

var isArgSupplied = function isArgSupplied(args, index) {
  return args.length > index && isNil(args[index]) === false;
};

var getOpts = function getOpts(args) {
  return {
    sectionLength: isArgSupplied(args, 2) ? toInteger(args[2]) : 3,

    /* Formats a number (string) of fixed-point notation, with user delimeters. */
    sectionDelimiter: isArgSupplied(args, 3) ? toStr(args[3]) : ',',
    decimalDelimiter: isArgSupplied(args, 4) ? toStr(args[4]) : '.'
  };
};

var getFixed = function getFixed(number, digits) {
  var fixed = numToString(toFixed.call(number, digits));

  if (digits > 0) {
    var parts = split.call(fixed, '.');
    parts[1] = strSlice.call("".concat(parts[1] || '', "00000000000000000000"), 0, digits);
    return join.call(parts, '.');
  }

  return fixed;
};

var getFixedReplaced = function getFixedReplaced(fixed, decimalDelimiter) {
  if (decimalDelimiter === '.') {
    return fixed;
  }

  return replace.call(fixed, '.', decimalDelimiter);
};

var getRegex = function getRegex(digits, sectionLength) {
  return new RE("\\d(?=(\\d{".concat(sectionLength, "})+").concat(digits > 0 ? '\\D' : '$', ")"), 'g');
}; // eslint-disable jsdoc/check-param-names
// noinspection JSCommentMatchesSignature

/**
 * Format a given number using fixed-point notation, with user specified digit
 * counts and seperators. `null` or 'undefined' can be used for optional
 * arguments to denote that the default value is to be used.
 *
 * @param {number} value - The numerical value to be formatted.
 * @param {number} [digits=2] - The number of digits to appear after the
 *  decimal point; this may be a value between 0 and 20, inclusive.
 * @param {number} [sectionLength=3] - Length of integer part sections.
 * @param {string} [sectionDelimiter=,] - Integer part section delimiter.
 * @param {string} [decimalDelimiter=.] - Decimal delimiter.
 * @returns {string} The numerical value with the chosen formatting.
 */
// eslint-enable jsdoc/check-param-names


var numberFormat = function numberFormat(value) {
  var number = toNumber(value);

  if (numberIsFinite(number) === false) {
    return numberToString.call(number);
  }
  /* 'digits' must be >= 0 or <= 20 otherwise a RangeError is thrown by Number#toFixed. */

  /* eslint-disable-next-line prefer-rest-params */


  var digits = isArgSupplied(arguments, 1) ? mathClamp(toInteger(arguments[1]), 0, 20) : 2;
  /* Formats a number using fixed-point notation. */

  var fixed = getFixed(number, digits);
  /* eslint-disable-next-line prefer-rest-params */

  var _getOpts = getOpts(arguments),
      sectionLength = _getOpts.sectionLength,
      sectionDelimiter = _getOpts.sectionDelimiter,
      decimalDelimiter = _getOpts.decimalDelimiter;

  return replace.call(getFixedReplaced(fixed, decimalDelimiter), getRegex(digits, sectionLength), "$&".concat(sectionDelimiter));
};

export default numberFormat;

//# sourceMappingURL=number-format-x.esm.js.map