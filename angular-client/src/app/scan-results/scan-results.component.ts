import { Component, Input, OnChanges, SimpleChanges  } from '@angular/core';

import { Scanner } from '../interfaces/scanner.interface';
import { Beacon } from "../interfaces/beacon.interface";
import { Feed } from '../types/thingspeak/feed';
import { FeedService } from '../services/feed.service';
import { BEACONS } from '../data/beacons';
import { SCANNERS } from '../data/scanners';


@Component({
  selector: 'app-scan-results',
  templateUrl: './scan-results.component.html',
  styleUrls: ['./scan-results.component.scss']
})
export class ScanResultsComponent implements OnChanges {

  @Input() feeds?: Feed[] = [];

  constructor(private feedService: FeedService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.feeds = changes['feeds'].currentValue; 
  }

  scanners: Scanner [] = SCANNERS;
  beacons: Beacon[] = BEACONS;

  private hashOfFeedsPerBeacon: any = {};

  filterFeedsByBeacon(feeds: Feed[], beacon: Beacon): Feed[] {
    return feeds.filter((feed: Feed) => {
      return feed.beaconMacAddress() === beacon.address
    });
  }

  hasResults(beacon: Beacon): boolean {
    return this.results(beacon).length > 0;
  }

  results(beacon: Beacon): Feed[] {

    if (this.hashOfFeedsPerBeacon[beacon.address] && this.hashOfFeedsPerBeacon[beacon.address].length > 0) {
      return this.hashOfFeedsPerBeacon[beacon.address];
    }

    let feedsForBeacon: Feed[] = this.filterFeedsByBeacon(this.feeds || [], beacon);
    let sortedFeeds = this.feedService.sortFeedsFromLatest(feedsForBeacon);

    this.hashOfFeedsPerBeacon[beacon.address] = sortedFeeds;

    return sortedFeeds;
  }

  getScannerNameByAddress(address: string): string | undefined {
    let filteredScanners = this.scanners.find(scanner => {
      return (scanner.address === address);
    });
    return (filteredScanners?.name);
  }

  /* 
    @todo
    create enum of multipliers and map to scanners (based on location and impact of signal)
    calculate distance based on this
  */
  distance(feed: Feed): number {
    return feed.rssi();
  }
}
