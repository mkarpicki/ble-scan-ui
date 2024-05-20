import { Component, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { IScanner } from '../interfaces/scanner.interface';
import { Feed } from '../types/thingspeak/feed';
import { DistanceCalculatorService } from '../services/distance-calculator.service';
import { SCANNERS } from '../data/scanners';
import { findScannerPositionOnMap } from '../data/scanners-positions';
import { FeedResponse } from '../types/thingspeak/feed-response';


@Component({
  selector: 'app-scan-results',
  templateUrl: './scan-results.component.html',
  styleUrls: ['./scan-results.component.scss']
})
export class ScanResultsComponent implements OnChanges {

  @Input() feeds?: Feed[] = [];

  // todo
  //hardcoded now but maybe should come from above?
  mapId: string = 'land-map';
  
  scanners: IScanner [] = SCANNERS;

  //this is time range when searching other scanners signal close to selected feed (signal)
  private secondsToSearch = 30;

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
    let diff = 1000 * this.secondsToSearch;
    
    if (timestamp1 >= timestamp2) {
      return (timestamp1 - timestamp2) <= diff;
    } else {
      return (timestamp2 - timestamp1) <= diff;
    }
  }

  /*
    @todo
    jump to selected (scoll)
  */
  isSelectedFeed(feed: Feed | undefined): boolean {
    return (feed?.entryId() === this.selectedFeed?.entryId());
  }

  selectLastFeed(): boolean {
    if (this.hasResults()) {
      this.selectFeed(this.newestResult());
    } else {
      this.selectFeed(undefined);
    }
    this.keepSelectingLast = true;
    return false;
  }

  selectFeed(feed: Feed | undefined): boolean {
    this.selectedFeed = feed;
    this.keepSelectingLast = false;
    return false;
  }

  selectNextFeed(): boolean {
    this.moveFeedByEntryId(+1);
    return false;
  }

  selectPrevFeed(): boolean {
    this.moveFeedByEntryId(-1);    
    return false;
  }

  moveFeedByEntryId(diff: number): boolean {
    if (this.selectedFeed) {
      let entryId = this.selectedFeed.entryId() + diff;
      this.selectFeed(this.findFeedByEntryId(entryId));
    } else {
      this.selectLastFeed();
    }    
    return false;    
  }

  findFeedByEntryId(entryId: number): Feed | undefined {
    
    return this.results().find(feed => {
      return feed.entryId() === entryId;
    });
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
    
    if (feedToCompare) {
      filteredResults.push(feedToCompare);
      hashOfResults[feedToCompare.scannerMacAddress()] = true;
    }

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
      let scannerPosition = findScannerPositionOnMap(scanner.name, this.mapId);
      if (scannerPosition) {
        return this.distanceCalculatorService.estimateDistanceBySignal(feed.rssi(), scannerPosition);
      }
    }
    return undefined;
  }
}
