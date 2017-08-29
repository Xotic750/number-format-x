'use strict';

var numberFormat;
if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');
  if (typeof JSON === 'undefined') {
    JSON = {};
  }
  require('json3').runInContext(null, JSON);
  require('es6-shim');
  var es7 = require('es7-shim');
  Object.keys(es7).forEach(function (key) {
    var obj = es7[key];
    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  numberFormat = require('../../index.js');
} else {
  numberFormat = returnExports;
}

describe('numberFormat', function () {
  it('is a function', function () {
    expect(typeof numberFormat).toBe('function');
  });

  it('should format correctly', function () {
    expect(numberFormat(12345678.9)).toBe('12,345,678.90000000037252902985');
    expect(numberFormat(12345678.9, 2)).toBe('12,345,678.90');
    expect(numberFormat(12345678.9, 2, 2)).toBe('12,34,56,78.90');
    expect(numberFormat(12345678.9, 3, 3, '^')).toBe('12^345^678.900');
    expect(numberFormat(12345678.9, 3, 3, '.', ',')).toBe('12.345.678,900');
    expect(numberFormat(123456.789, 4, 4, ' ', ':')).toBe('12 3456:7890');
    expect(numberFormat(12345678.9, 0, 3, '-')).toBe('12-345-679');
  });

  it('null denotes use default', function () {
    expect(numberFormat(12345678.9, null, null, null, null)).toBe('12,345,678.90000000037252902985');
    expect(numberFormat(12345678.9, null, null, null, ':')).toBe('12,345,678:90000000037252902985');
    expect(numberFormat(12345678.9, 0, null, '-')).toBe('12-345-679');
  });
});
