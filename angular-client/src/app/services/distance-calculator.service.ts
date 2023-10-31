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
    return rssi * (-1) * scanner.signalMultiplier / 33;
  }
}
