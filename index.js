/**
 * @file Format a number.
 * @version 3.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module number-format-x
 */

'use strict';

var cachedCtrs = require('cached-constructors-x');
var RE = cachedCtrs.RegExp;
var toFixed = cachedCtrs.Number.prototype.toFixed;
var numberToString = cachedCtrs.Number.prototype.toString;
var replace = cachedCtrs.String.prototype.replace;
var split = cachedCtrs.String.prototype.split;
var strSlice = cachedCtrs.String.prototype.slice;
var join = cachedCtrs.Array.prototype.join;
var toNumber = require('to-number-x').toNumber2018;
var toInteger = require('to-integer-x').toInteger2018;
var numberIsFinite = require('is-finite-x');
var numToString = require('number-to-decimal-form-string-x');
var toStr = require('to-string-x');
var mathClamp = require('math-clamp-x');
var isNil = require('is-nil-x');

var isArgSupplied = function _isArgSupplied(args, index) {
  return args.length > index && isNil(args[index]) === false;
};

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
 * @example
 * var numberFormat = require('number-format-x');
 *
 * numberFormat(12345678.9, 3); // "12,345,678.900"
 * numberFormat(12345678.9, null, null, '.', ','); // "12.345.678,90"
 * numberFormat(123456.789, 4, 4, ' ', ':'); // "12 3456:7890"
 * numberFormat(12345678.9, 0, null, '-'); // "12-345-679"
 */
module.exports = function numberFormat(value) {
  var number = toNumber(value);
  if (numberIsFinite(number) === false) {
    return numberToString.call(number);
  }

  // 'digits' must be >= 0 or <= 20 otherwise a RangeError is thrown by Number#toFixed.
  var digits = isArgSupplied(arguments, 1) ? mathClamp(toInteger(arguments[1]), 0, 20) : 2;
  // Formats a number using fixed-point notation.
  var fixed = numToString(toFixed.call(number, digits));
  if (digits > 0) {
    var parts = split.call(fixed, '.');
    parts[1] = strSlice.call((parts[1] || '') + '00000000000000000000', 0, digits);
    fixed = join.call(parts, '.');
  }

  var sectionLength = isArgSupplied(arguments, 2) ? toInteger(arguments[2]) : 3;
  // Formats a number (string) of fixed-point notation, with user delimeters.
  var sectionDelimiter = isArgSupplied(arguments, 3) ? toStr(arguments[3]) : ',';
  var decimalDelimiter = isArgSupplied(arguments, 4) ? toStr(arguments[4]) : '.';

  return replace.call(
    decimalDelimiter === '.' ? fixed : replace.call(fixed, '.', decimalDelimiter),
    new RE('\\d(?=(\\d{' + sectionLength + '})+' + (digits > 0 ? '\\D' : '$') + ')', 'g'),
    '$&' + sectionDelimiter
  );
};
