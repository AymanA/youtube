import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberPrecision'
})
export class NumberPrecisionPipe implements PipeTransform {

  transform(number: any, args?: any): any {
    const precision = 0;
    const minimum = 1000;
    number = parseInt(number, 10);
    if (isNaN(number)) {
      return;
    }
    number.toFixed(precision);
    if (number < minimum) {
      return number;
    }
    const powerOfTen = Math.floor(Math.log(Math.abs(number)) * Math.LOG10E);
    let result;
    switch (powerOfTen) {
      case 3:
      case 4:
      case 5:
        result = (number / Math.pow(10, 3)).toFixed(precision) + 'K';
        break;
      case 6:
      case 7:
      case 8:
        result = (number / Math.pow(10, 6)).toFixed(precision) + 'M';
        break;
      case 9:
      case 10:
      case 11:
        result = (number / Math.pow(10, 9)).toFixed(precision) + 'B';
        break;
      case 12:
      case 13:
      case 14:
        result = (number / Math.pow(10, 12)).toFixed(precision) + 'T';
        break;
      default:
        result = number.toFixed(precision);
        break;

    }
    return result;
  }

}
