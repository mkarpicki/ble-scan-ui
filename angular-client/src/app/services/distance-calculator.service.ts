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
  estimateDistanceBySignal(rssi: number, scanner: IScanner): number {
    const n = 2;
    const measured_power = -69;
    const pow = Math.pow(10, ((measured_power -rssi) / (10 * n)));
    return Math.round(pow * 100) / 100;
    //return (rssi * (-1)) / 33;
  }

  circleIntersection (circle1: any, circle2: any): any[] {
    // Extract circle information
    const { x: x1, y: y1, radius: r1 } = circle1;
    const { x: x2, y: y2, radius: r2 } = circle2;
  
    // Calculate distance between the centers of the circles
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
  
    // Check if the circles intersect
    if (distance > r1 + r2 || distance < Math.abs(r1 - r2)) {
        // Circles do not intersect
        return [];
    }
  
    // Calculate intersection points
    const a = (r1 * r1 - r2 * r2 + distance * distance) / (2 * distance);
    const h = Math.sqrt(r1 * r1 - a * a);
  
    // Calculate intersection points
    const x3 = x1 + a * (x2 - x1) / distance;
    const y3 = y1 + a * (y2 - y1) / distance;
  
    const x4 = x3 + h * (y2 - y1) / distance;
    const y4 = y3 - h * (x2 - x1) / distance;
  
    const x5 = x3 - h * (y2 - y1) / distance;
    const y5 = y3 + h * (x2 - x1) / distance;
  
    return [{ x: x4, y: y4 }, { x: x5, y: y5 }];
  }

  distanceBetweenCoordinates (x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  trilaterate (points: any[]): any {
    // Check if we have enough points
    if (points.length < 3) {
        return;
    }
    
    // Extract coordinates and distances
    let x1 = points[0].x, y1 = points[0].y, d1 = points[0].radius;
    let x2 = points[1].x, y2 = points[1].y, d2 = points[1].radius;
    let x3 = points[2].x, y3 = points[2].y, d3 = points[2].radius;
    
    // Calculate coefficients for trilateration equations
    let A = 2 * (x2 - x1);
    let B = 2 * (y2 - y1);
    let C = 2 * (x3 - x1);
    let D = 2 * (y3 - y1);
    
    let E = d1 * d1 - d2 * d2 - x1 * x1 + x2 * x2 - y1 * y1 + y2 * y2;
    let F = d1 * d1 - d3 * d3 - x1 * x1 + x3 * x3 - y1 * y1 + y3 * y3;
    
    // Solve for unknown coordinates
    let unknownX = (E * D - F * B) / (A * D - B * C);
    let unknownY = (E * C - F * A) / (B * C - A * D);
    
    return { x: unknownX, y: unknownY };
  }

}
