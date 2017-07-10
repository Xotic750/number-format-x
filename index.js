/**
 * @file Format a number.
 * @version 1.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module number-format-x
 */

'use strict';

var toInteger = require('to-integer-x');

// eslint-disable-next-line max-params
var numberFormat = function _numberFormat(value, n, x, s, c) {
  // 'digits' must be >= 0 or <=20 otherwise an RangeError is
  // thrown by Number#toFixed.
  var digits = Math.min(Math.max(toInteger(n), 0), 20);
  // Formats a number using fixed-point notation.
  var num = value.toFixed(digits);
  // Formats a number (string) of fixed-point notation, with user delimeters.
  var rxStr = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')';
  var rx = new RegExp(rxStr, 'g');
  return (c ? num.replace('.', c) : num).replace(rx, '$&' + (s || ','));
};

/**
 * Format a given number using fixed-point notation, with user specified digit
 * counts and seperators.
 *
 * @param {number} value The numerical value to be formatted.
 * @param {number} n Length of decimal.
 * @param {number} x Length of whole part.
 * @param {string} [s=','] Sections delimiter.
 * @param {string} [c='.'] Decimal delimiter.
 * @throws {RangeError} If n is greater than 20.
 * @return {string} The numerical value with the choosen formatting.
 * @example
 * var numberFormat = require('number-format-x');
 *
 * numberFormat(12345678.9, 2, 3);  // "12,345,678.90"
 * numberFormat(12345678.9, 2, 3, '.', ',');  // "12.345.678,90"
 * numberFormat(123456.789, 4, 4, ' ', ':');  // "12 3456:7890"
 * numberFormat(12345678.9, 0, 3, '-');       // "12-345-679"
 */
module.exports = numberFormat;
