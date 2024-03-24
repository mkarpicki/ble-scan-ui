import { Component, Input, OnChanges, SimpleChanges  } from '@angular/core';

import { IScanner } from '../interfaces/scanner.interface';
import { Feed } from '../types/thingspeak/feed';

import { DistanceCalculatorService } from '../services/distance-calculator.service';

import { SCANNERS } from '../data/scanners';


@Component({
  selector: 'app-scan-results',
  templateUrl: './scan-results.component.html',
  styleUrls: ['./scan-results.component.scss']
})
export class ScanResultsComponent implements OnChanges {

  @Input() feeds?: Feed[] = [];

  constructor(
    private distanceCalculatorService: DistanceCalculatorService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.feeds = changes['feeds'].currentValue; 
  }

  scanners: IScanner [] = SCANNERS;

  private findScannerByAddress (address: string): IScanner | undefined {

    const filteredScanners = this.scanners.find(scanner => {
      return (scanner.address === address);
    });
    return filteredScanners;
  };

  /**
   * 
   * tood
   * 1. click on each feed to define last feed to see
   * 2. change list to show selected lasResults
   * 3. pass to map lasTrsults
   * 4. change lastresuls method to look for selected to scan 
   * 5. onload: select last 
   */

  // lastFeedPerBeacon: any = {};

  // selectLastFeed(beacon: IBeacon): void {
  //   this.lastFeedPerBeacon[beacon.address] = this.results(beacon)[0];
  // };

  // selectFeed(beacon: IBeacon, feed: Feed): void {
  //   this.lastFeedPerBeacon[beacon.address] = feed;
  // }

  results(): Feed[] {
    return this.feeds || [];
  }

  hasResults(): boolean {
    return this.results().length > 0;
  }

  lastResults(): Feed[] {
    const results = this.results();
    let hashOfResults: any = {};
    let filteredResults: Feed[] = [];

    //this logic may need to change
    //for now I assume that I call feed for last 5 mins
    //and find each newest feed per scanner
    results.forEach(result => {
      if (!hashOfResults[result.scannerMacAddress()]) {
        filteredResults.push(result);
        hashOfResults[result.scannerMacAddress()] = true;
      }
    });

    return filteredResults;
  }

  getScannerNameByAddress(address: string): string | undefined {
    const scanner = this.findScannerByAddress(address);

    return scanner?.name;
  }

  /* 
    @todo
    create enum of multipliers and map to scanners (based on location and impact of signal)
    calculate distance based on this
  */
  distance(feed: Feed): number | unknown {
    const scanner = this.findScannerByAddress(feed.scannerMacAddress());
    if (scanner) {
      return this.distanceCalculatorService.calculate(feed.rssi(), scanner);
    }
    return undefined;
  }
}
