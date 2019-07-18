import toNumber from 'to-number-x';
import toInteger from 'to-integer-x';
import numberIsFinite from 'is-finite-x';
import numToString from 'number-to-decimal-form-string-x';
import toStr from 'to-string-x';
import mathClamp from 'math-clamp-x';
import isNil from 'is-nil-x';

const RE = /none/.constructor;
const {toFixed, toString: numberToString} = 0;
const {replace, split, slice: strSlice} = '';
const {join} = [];

const isArgSupplied = function _isArgSupplied(args, index) {
  return args.length > index && isNil(args[index]) === false;
};

// eslint-disable jsdoc/check-param-names
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
 * @returns {string} The numerical value with the choosen formatting.
 */
// eslint-enable jsdoc/check-param-names
const numberFormat = function numberFormat(value) {
  const number = toNumber(value);

  if (numberIsFinite(number) === false) {
    return numberToString.call(number);
  }

  // 'digits' must be >= 0 or <= 20 otherwise a RangeError is thrown by Number#toFixed.
  /* eslint-disable-next-line prefer-rest-params */
  const digits = isArgSupplied(arguments, 1) ? mathClamp(toInteger(arguments[1]), 0, 20) : 2;
  // Formats a number using fixed-point notation.
  let fixed = numToString(toFixed.call(number, digits));

  if (digits > 0) {
    const parts = split.call(fixed, '.');
    parts[1] = strSlice.call(`${parts[1] || ''}00000000000000000000`, 0, digits);
    fixed = join.call(parts, '.');
  }

  /* eslint-disable-next-line prefer-rest-params */
  const sectionLength = isArgSupplied(arguments, 2) ? toInteger(arguments[2]) : 3;
  // Formats a number (string) of fixed-point notation, with user delimeters.
  /* eslint-disable-next-line prefer-rest-params */
  const sectionDelimiter = isArgSupplied(arguments, 3) ? toStr(arguments[3]) : ',';
  /* eslint-disable-next-line prefer-rest-params */
  const decimalDelimiter = isArgSupplied(arguments, 4) ? toStr(arguments[4]) : '.';

  return replace.call(
    decimalDelimiter === '.' ? fixed : replace.call(fixed, '.', decimalDelimiter),
    new RE(`\\d(?=(\\d{${sectionLength}})+${digits > 0 ? '\\D' : '$'})`, 'g'),
    `$&${sectionDelimiter}`,
  );
};

export default numberFormat;
