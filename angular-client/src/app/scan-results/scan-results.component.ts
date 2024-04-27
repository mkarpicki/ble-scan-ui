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

  private minutesToSearch = 1;

  private keepSelectingLast = true;
  private selectedFeed?: Feed = undefined;

  constructor(
    private distanceCalculatorService: DistanceCalculatorService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.feeds = changes['feeds'].currentValue; 
    if (this.keepSelectingLast) {
      this.selectLastFeed();  
    }
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
    let diff = 1000 * 60 * this.minutesToSearch;
    
    if (timestamp1 >= timestamp2) {
      return (timestamp1 - timestamp2) <= diff;
    } else {
      return (timestamp2 - timestamp1) <= diff;
    }
  }

  selectLastFeed(): void {
    if (this.hasResults()) {
      this.selectFeed(this.newestResult());
    } else {
      this.selectFeed(undefined);
    }
    this.keepSelectingLast = true;
  }

  selectFeed(feed: Feed | undefined): void {
    this.selectedFeed = feed;
    this.keepSelectingLast = false;
  }

  results(): Feed[] {
    return this.feeds || [];
  }

  hasResults(): boolean {
    return this.results().length > 0;
  }

  selectFeedsAroundSelected(): Feed[] {
    const results = this.results();
    let hashOfResults: any = {};
    let filteredResults: Feed[] = [];

    const feedToCompare = this.selectedFeed !== undefined ? this.selectedFeed : this.newestResult();

    results.forEach(result => {

      let isResultCloseToSearchItem = this.isScanTimeClose(
        new Date(result.createdAt()).getTime(),
        new Date(feedToCompare.createdAt()).getTime()
      );

      if (isResultCloseToSearchItem) {
        if (!hashOfResults[result.scannerMacAddress()]) {
          filteredResults.push(result);
          hashOfResults[result.scannerMacAddress()] = true;
        }
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
      return this.distanceCalculatorService.estimateDistanceBySignal(feed.rssi(), scanner);
    }
    return undefined;
  }
}
