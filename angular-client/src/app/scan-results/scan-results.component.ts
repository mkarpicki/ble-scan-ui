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
  
  scanners: IScanner [] = SCANNERS;

  private minutesToSearch = 2;

  selectedFeed?: Feed = undefined;

  constructor(
    private distanceCalculatorService: DistanceCalculatorService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.feeds = changes['feeds'].currentValue; 
    this.selectLastFeed();
  }

  private findScannerByAddress (address: string): IScanner | undefined {

    const filteredScanners = this.scanners.find(scanner => {
      return (scanner.address === address);
    });
    return filteredScanners;
  };

  private newestResult(): Feed {
    return this.results()[0];
  }

  private isScanTimeClose(timestamp1: number, timestamp2: number): boolean {
    let diff = 1000 * 60 * 2;
    if (timestamp1 >= timestamp2) {
      return (timestamp1 - timestamp2) <= diff;
    } else {
      return (timestamp2 - timestamp1) <= diff;
    }
  }

  selectLastFeed(): void {
    if (this.hasResults()) {
      this.selectedFeed = this.newestResult();
    } else {
      this.selectedFeed = undefined;
    }
  }

  selectFeed(feed: Feed): void {
    debugger;
    this.selectedFeed = feed;
  }

  results(): Feed[] {
    console.log('this.feeds');
    console.log(this.feeds);
    return this.feeds || [];
  }

  hasResults(): boolean {
    return this.results().length > 0;
  }

  drawFeedsAroundSelected(): Feed[] {
    const results = this.results();
    let hashOfResults: any = {};
    let filteredResults: Feed[] = [];

    // fixme
    const feedToCompare = this.selectedFeed !== undefined ? this.selectedFeed : this.newestResult();

    results.forEach(result => {

      let isResultCloseToSearchItem = this.isScanTimeClose(
        Number(result.createdAt()),
        Number(feedToCompare.createdAt())
      );

      // fixme
      //if (isResultCloseToSearchItem) {
        if (!hashOfResults[result.scannerMacAddress()]) {
          filteredResults.push(result);
          hashOfResults[result.scannerMacAddress()] = true;
        }
      //}

    });

    return filteredResults;
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
