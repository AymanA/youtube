import { NumberPrecisionPipe } from './number-precision.pipe';

describe('NumberPrecisionPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberPrecisionPipe();
    expect(pipe).toBeTruthy();
  });
});
