import { Injectable } from '@angular/core';
import { IScanner } from '../interfaces/scanner.interface';

@Injectable({
  providedIn: 'root'
})
export class DistanceCalculatorService {

  constructor() { }

  /* 
  * @todo
    implement based on real measurements
  */
  calculate(rssi: number, scanner: IScanner): number {
    let n = 2;
    let measured_power = -69;
    return Math.pow(10, ((measured_power -rssi) / (10 * n)));
    //return (rssi * (-1)) / 33;
  }
}
