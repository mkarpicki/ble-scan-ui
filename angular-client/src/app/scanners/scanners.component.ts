import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IScanner } from '../interfaces/scanner.interface';
import { SCANNERS } from '../data/scanners';
import { Feed } from '../types/thingspeak/feed';
import { FeedService } from '../services/feed.service';

@Component({
  selector: 'app-scanners',
  templateUrl: './scanners.component.html',
  styleUrls: ['./scanners.component.scss']
})
export class ScannersComponent implements OnChanges{

  @Input() feeds?: Feed[] = [];

  //private maxMinutesOfSilence = 5;

  constructor(private feedService: FeedService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.feeds = changes['feeds'].currentValue; 
  }

  scanners: IScanner [] = SCANNERS;
  
  lastEntry(scanner: IScanner): string {

    let createdAt = '';

    if (scanner && this.feeds && this.feeds.length > 0) {
      
      const sortedFeeds = this.feedService.sortFeedsFromLatest(this.feeds);

      for (let feed of sortedFeeds) {
        if (scanner.address === feed.scannerMacAddress()) {
          createdAt = feed.created_at;
          break;
        }
      };
    }

    return createdAt;
  }

}
