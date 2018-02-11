import {
  NumberPrecisionPipe
} from './number-precision.pipe';

describe('NumberPrecisionPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberPrecisionPipe();
    expect(pipe).toBeTruthy();
  });
});

describe('when input is invalid', () => {
  it('should return undefined', () => {
    const pipe = new NumberPrecisionPipe();
    expect(pipe.transform('non-parsable-string')).toBeUndefined();
  });
});

describe('when input is valid', () => {
  const pipe = new NumberPrecisionPipe();

  it('should handle an integer as a parameter', () => {
    expect(pipe.transform(1)).toBe(1);
    expect(pipe.transform(456)).toBe(456);
  });

  it('should handle a float as a parameter', () => {
    expect(pipe.transform(10.04)).toBe(10);
    expect(pipe.transform(2.57)).toBe(2);
  });

  it('should handle a parsable string as a parameter', () => {
    expect(pipe.transform('12')).toBe(12);
    expect(pipe.transform('2.57')).toBe(2);
  });

  it('should default the minimum parameter to `1000`', () => {
    expect(pipe.transform(999)).toBe(999);
    expect(pipe.transform(1001)).toBe('1K');
  });
  it('should add `K` suffix', () => {
    expect(pipe.transform(1234)).toBe('1K');
    expect(pipe.transform(12345)).toBe('12K');
    expect(pipe.transform(123456)).toBe('123K');
  });
  it('should add `M` suffix', () => {
    expect(pipe.transform(1234567)).toBe('1M');
    expect(pipe.transform(12345678)).toBe('12M');
    expect(pipe.transform(123456789)).toBe('123M');
  });
  it('should add `B` suffix', () => {
    expect(pipe.transform(1234567890)).toBe('1B');
    expect(pipe.transform(12345678901)).toBe('12B');
    expect(pipe.transform(123456789012)).toBe('123B');
  });
  it('should add `T` suffix', () => {
    expect(pipe.transform(1234567890123)).toBe('1T');
    expect(pipe.transform(12345678901234)).toBe('12T');
    expect(pipe.transform(123456789012345)).toBe('123T');
  });
});
