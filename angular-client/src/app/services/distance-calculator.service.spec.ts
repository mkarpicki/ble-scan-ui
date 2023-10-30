import { TestBed } from '@angular/core/testing';

import { DistanceCalculatorService } from './distance-calculator.service';

describe('DistanceCalculatorService', () => {
  let service: DistanceCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistanceCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
