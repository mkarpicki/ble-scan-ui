import { Component, Input, OnChanges, SimpleChanges  } from '@angular/core';

import { IScanner } from '../interfaces/scanner.interface';
import { IBeacon } from "../interfaces/beacon.interface";
import { Feed } from '../types/thingspeak/feed';

import { FeedService } from '../services/feed.service';
import { DistanceCalculatorService } from '../services/distance-calculator.service';

import { BEACONS } from '../data/beacons';
import { SCANNERS } from '../data/scanners';


@Component({
  selector: 'app-scan-results',
  templateUrl: './scan-results.component.html',
  styleUrls: ['./scan-results.component.scss']
})
export class ScanResultsComponent implements OnChanges {

  @Input() feeds?: Feed[] = [];

  constructor(
    private feedService: FeedService,
    private distanceCalculatorService: DistanceCalculatorService
    ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.feeds = changes['feeds'].currentValue; 
  }

  scanners: IScanner [] = SCANNERS;
  beacons: IBeacon[] = BEACONS;

  private hashOfFeedsPerBeacon: any = {};

  private findScannerByAddress (address: string): IScanner | undefined {

    let filteredScanners = this.scanners.find(scanner => {
      return (scanner.address === address);
    });
    return filteredScanners;
  };

  filterFeedsByBeacon(feeds: Feed[], beacon: IBeacon): Feed[] {
    return feeds.filter((feed: Feed) => {
      return feed.beaconMacAddress() === beacon.address
    });
  }

  hasResults(beacon: IBeacon): boolean {
    return this.results(beacon).length > 0;
  }

  lastResults(beacon: IBeacon): Feed[] {
    let results = this.results(beacon);
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

  results(beacon: IBeacon): Feed[] {

    if (this.hashOfFeedsPerBeacon[beacon.address] && this.hashOfFeedsPerBeacon[beacon.address].length > 0) {
      return this.hashOfFeedsPerBeacon[beacon.address];
    }

    let feedsForBeacon: Feed[] = this.filterFeedsByBeacon(this.feeds || [], beacon);
    let sortedFeeds = this.feedService.sortFeedsFromLatest(feedsForBeacon);

    this.hashOfFeedsPerBeacon[beacon.address] = sortedFeeds;

    return sortedFeeds;
  }

  getScannerNameByAddress(address: string): string | undefined {
    let scanner = this.findScannerByAddress(address);

    return scanner?.name;
  }

  /* 
    @todo
    create enum of multipliers and map to scanners (based on location and impact of signal)
    calculate distance based on this
  */
  distance(feed: Feed): number | unknown {
    let scanner = this.findScannerByAddress(feed.scannerMacAddress());
    if (scanner) {
      return this.distanceCalculatorService.calculate(feed.rssi(), scanner);
    }
    return undefined;
  }
}
