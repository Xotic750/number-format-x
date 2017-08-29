/**
 * @file Format a number.
 * @version 2.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module number-format-x
 */

'use strict';

var toNumber = require('to-number-x');
var toInteger = require('to-integer-x');
var toStr = require('to-string-x');
var mathClamp = require('math-clamp');
var isNull = require('lodash.isnull');

var $numberFormat = function numberFormat(value) {
  var argsLength = arguments.length;
  // 'digits' must be >= 0 or <=20 otherwise an RangeError is thrown by Number#toFixed.
  var digits = argsLength > 1 && isNull(arguments[1]) === false ? mathClamp(toInteger(arguments[1]), 0, 20) : 20;
  // Formats a number using fixed-point notation.
  var fixed = toNumber(value).toFixed(digits);
  var sectionLength = argsLength > 2 && isNull(arguments[2]) === false ? toInteger(arguments[2]) : 3;
  // Formats a number (string) of fixed-point notation, with user delimeters.
  var sectionDelimiter = argsLength > 3 && isNull(arguments[3]) === false ? toStr(arguments[3]) : ',';
  var decimalDelimiter = argsLength > 4 && isNull(arguments[4]) === false ? toStr(arguments[4]) : '.';
  if (decimalDelimiter !== '.') {
    fixed = fixed.replace('.', decimalDelimiter);
  }

  return fixed.replace(
    new RegExp('\\d(?=(\\d{' + sectionLength + '})+' + (digits > 0 ? '\\D' : '$') + ')', 'g'),
    '$&' + sectionDelimiter
  );
};

/**
 * Format a given number using fixed-point notation, with user specified digit
 * counts and seperators. `ǹull` can be used for optional arguments to demote
 * that the default value is to be used.
 *
 * @param {number} value - The numerical value to be formatted.
 * @param {number} [digits=20] - The number of digits to appear after the
 *  decimal point; this may be a value between 0 and 20, inclusive.
 * @param {number} [sectionLength=3] - Length of integer part sections.
 * @param {string} [sectionDelimiter=","] - Integer part section delimiter.
 * @param {string} [decimalDelimiter="."] - Decimal delimiter.
 * @returns {string} The numerical value with the choosen formatting.
 * @example
 * var numberFormat = require('number-format-x');
 *
 * numberFormat(12345678.9, 2);  // "12,345,678.90"
 * numberFormat(12345678.9, 2, null, '.', ',');  // "12.345.678,90"
 * numberFormat(123456.789, 4, 4, ' ', ':');  // "12 3456:7890"
 * numberFormat(12345678.9, 0, null, '-');       // "12-345-679"
 */
module.exports = $numberFormat;
