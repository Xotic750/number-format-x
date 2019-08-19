import toNumber from 'to-number-x';
import toInteger from 'to-integer-x';
import numberIsFinite from 'is-finite-x';
import numToString from 'number-to-decimal-form-string-x';
import toStr from 'to-string-x';
import mathClamp from 'math-clamp-x';
import isNil from 'is-nil-x';
import methodize from 'simple-methodize-x';
var RE = /none/.constructor;
var MAX_TO_FIXED = 20;
var toFixed = methodize(MAX_TO_FIXED.toFixed);
var numberToString = methodize(MAX_TO_FIXED.toString);
var SECTION_DELIMITER = ',';
var DECIMAL_DELIMITER = '.';
var EMPTY_STRING = '';
var replace = methodize(EMPTY_STRING.replace);
var split = methodize(EMPTY_STRING.split);
var strSlice = methodize(EMPTY_STRING.slice);
var join = methodize([].join);

var isArgSupplied = function isArgSupplied(args, index) {
  return args.length > index && isNil(args[index]) === false;
};

var getOpts = function getOpts(args) {
  return {
    sectionLength: isArgSupplied(args, 2) ? toInteger(args[2]) : 3,

    /* Formats a number (string) of fixed-point notation, with user delimeters. */
    sectionDelimiter: isArgSupplied(args, 3) ? toStr(args[3]) : SECTION_DELIMITER,
    decimalDelimiter: isArgSupplied(args, 4) ? toStr(args[4]) : DECIMAL_DELIMITER
  };
};

var getFixed = function getFixed(number, digits) {
  var fixed = numToString(toFixed(number, digits));

  if (digits > 0) {
    var parts = split(fixed, DECIMAL_DELIMITER);
    parts[1] = strSlice("".concat(parts[1] || EMPTY_STRING, "00000000000000000000"), 0, digits);
    return join(parts, DECIMAL_DELIMITER);
  }

  return fixed;
};

var getFixedReplaced = function getFixedReplaced(fixed, decimalDelimiter) {
  if (decimalDelimiter === DECIMAL_DELIMITER) {
    return fixed;
  }

  return replace(fixed, DECIMAL_DELIMITER, decimalDelimiter);
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
    return numberToString(number);
  }
  /* 'digits' must be >= 0 or <= 20 otherwise a RangeError is thrown by Number#toFixed. */

  /* eslint-disable-next-line prefer-rest-params */


  var digits = isArgSupplied(arguments, 1) ? mathClamp(toInteger(arguments[1]), 0, MAX_TO_FIXED) : 2;
  /* Formats a number using fixed-point notation. */

  var fixed = getFixed(number, digits);
  /* eslint-disable-next-line prefer-rest-params */

  var _getOpts = getOpts(arguments),
      sectionLength = _getOpts.sectionLength,
      sectionDelimiter = _getOpts.sectionDelimiter,
      decimalDelimiter = _getOpts.decimalDelimiter;

  return replace(getFixedReplaced(fixed, decimalDelimiter), getRegex(digits, sectionLength), "$&".concat(sectionDelimiter));
};

export default numberFormat;

//# sourceMappingURL=number-format-x.esm.js.map