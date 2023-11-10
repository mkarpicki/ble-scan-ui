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
    const n = 2;
    const measured_power = -69;
    const pow = Math.pow(10, ((measured_power -rssi) / (10 * n)));
    return Math.round(pow * 100) / 100;
    //return (rssi * (-1)) / 33;
  }
}
