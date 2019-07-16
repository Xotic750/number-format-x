let numberFormat;

describe('numberFormat', function() {
  it('is a function', function() {
    expect.assertions(1);
    expect(typeof numberFormat).toBe('function');
  });

  it('naN, +-Infinity', function() {
    expect.assertions(1);
    expect(numberFormat(NaN)).toBe('NaN');
    expect(numberFormat(Infinity)).toBe('Infinity');
    expect(numberFormat(-Infinity)).toBe('-Infinity');
  });

  it('+- zero', function() {
    expect.assertions(1);
    expect(numberFormat(0)).toBe('0.00');
    expect(numberFormat(-0)).toBe('0.00');
  });

  it('should format integer correctly', function() {
    expect.assertions(1);
    expect(numberFormat(12345678)).toBe('12,345,678.00');
    expect(numberFormat(12345678, 20)).toBe('12,345,678.00000000000000000000');
    expect(numberFormat(12345678, 1, 2)).toBe('12,34,56,78.0');
    expect(numberFormat(12345678, 3, 3, '^')).toBe('12^345^678.000');
    expect(numberFormat(12345678, 3, 3, '.', ',')).toBe('12.345.678,000');
    expect(numberFormat(123456, 4, 4, ' ', ':')).toBe('12 3456:0000');
    expect(numberFormat(12345678, 0, 3, '-')).toBe('12-345-678');
  });

  it('should format negative integer correctly', function() {
    expect.assertions(1);
    expect(numberFormat(-12345678)).toBe('-12,345,678.00');
    expect(numberFormat(-12345678, 20)).toBe('-12,345,678.00000000000000000000');
    expect(numberFormat(-12345678, 1, 2)).toBe('-12,34,56,78.0');
    expect(numberFormat(-12345678, 3, 3, '^')).toBe('-12^345^678.000');
    expect(numberFormat(-12345678, 3, 3, '.', ',')).toBe('-12.345.678,000');
    expect(numberFormat(-123456, 4, 4, ' ', ':')).toBe('-12 3456:0000');
    expect(numberFormat(-12345678, 0, 3, '-')).toBe('-12-345-678');
  });

  it('should format float correctly', function() {
    expect.assertions(1);
    expect(numberFormat(12345678.9)).toBe('12,345,678.90');
    expect(numberFormat(12345678.9, 20)).toBe('12,345,678.90000000037252902985');
    expect(numberFormat(12345678.9, 1, 2)).toBe('12,34,56,78.9');
    expect(numberFormat(12345678.9, 3, 3, '^')).toBe('12^345^678.900');
    expect(numberFormat(12345678.9, 3, 3, '.', ',')).toBe('12.345.678,900');
    expect(numberFormat(123456.789, 4, 4, ' ', ':')).toBe('12 3456:7890');
    expect(numberFormat(12345678.9, 0, 3, '-')).toBe('12-345-679');
  });

  it('should format negative float correctly', function() {
    expect.assertions(1);
    expect(numberFormat(-12345678.9)).toBe('-12,345,678.90');
    expect(numberFormat(-12345678.9, 20)).toBe('-12,345,678.90000000037252902985');
    expect(numberFormat(-12345678.9, 1, 2)).toBe('-12,34,56,78.9');
    expect(numberFormat(-12345678.9, 3, 3, '^')).toBe('-12^345^678.900');
    expect(numberFormat(-12345678.9, 3, 3, '.', ',')).toBe('-12.345.678,900');
    expect(numberFormat(-123456.789, 4, 4, ' ', ':')).toBe('-12 3456:7890');
    expect(numberFormat(-12345678.9, 0, 3, '-')).toBe('-12-345-679');
  });

  it('null denotes use default', function() {
    expect.assertions(1);
    expect(numberFormat(12345678.9, null, null, null, null)).toBe('12,345,678.90');
    expect(numberFormat(12345678.9, null, null, null, ':')).toBe('12,345,678:90');
    expect(numberFormat(12345678.9, 0, null, '-')).toBe('12-345-679');
  });

  it('+-Number.MAX_VALUE', function() {
    expect.assertions(1);
    expect(numberFormat(Number.MAX_VALUE)).toBe(
      '179,769,313,486,231,570,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000.00',
    );
    expect(numberFormat(-Number.MAX_VALUE)).toBe(
      '-179,769,313,486,231,570,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000.00',
    );
  });

  it('+-Number.MIN_VALUE', function() {
    expect.assertions(1);
    expect(numberFormat(Number.MIN_VALUE, 20)).toBe('0.00000000000000000000');
    expect(numberFormat(-Number.MIN_VALUE, 20)).toBe('-0.00000000000000000000');
  });
});
