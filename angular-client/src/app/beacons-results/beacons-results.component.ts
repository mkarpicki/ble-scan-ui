import { Component, Input, OnChanges, SimpleChanges  } from '@angular/core';

import { IScanner } from '../interfaces/scanner.interface';
import { IBeacon } from "../interfaces/beacon.interface";
import { Feed } from '../types/thingspeak/feed';

import { FeedService } from '../services/feed.service';

import { BEACONS } from '../data/beacons';
import { SCANNERS } from '../data/scanners';


@Component({
  selector: 'app-beacons-results',
  templateUrl: './beacons-results.component.html',
  styleUrls: ['./beacons-results.component.scss']
})
export class BeaconsResultsComponent implements OnChanges {

  @Input() feeds?: Feed[] = [];

  constructor(
    private feedService: FeedService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.feeds = changes['feeds'].currentValue; 
  }

  scanners: IScanner [] = SCANNERS;
  beacons: IBeacon[] = BEACONS;

  filterFeedsByBeacon(feeds: Feed[], beacon: IBeacon): Feed[] {
    const flteredFeeds =  feeds.filter((feed: Feed) => {
      return feed.beaconMacAddress() === beacon.address
    });
    return flteredFeeds;
  }

  results(beacon: IBeacon): Feed[] {

    const feedsForBeacon: Feed[] = this.filterFeedsByBeacon(this.feeds || [], beacon);
    const sortedFeeds = this.feedService.sortFeedsFromLatest(feedsForBeacon);

    return sortedFeeds;
  }

}
