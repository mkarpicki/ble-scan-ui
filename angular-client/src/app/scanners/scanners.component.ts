import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Scanner } from '../interfaces/scanner.interface';
import { SCANNERS } from '../data/scanners';
import { Feed } from '../types/thingspeak/feed';

@Component({
  selector: 'app-scanners',
  templateUrl: './scanners.component.html',
  styleUrls: ['./scanners.component.scss']
})
export class ScannersComponent implements OnChanges{

  @Input() feeds?: Feed[] = [];

  ngOnChanges(changes: SimpleChanges) {
    this.feeds = changes['feeds'].currentValue; 
  }

  scanners: Scanner [] = SCANNERS;
  
  private sortFeedsFromLatest(feeds: Feed[]): Feed[] {
    return feeds.sort((item1: Feed, item2: Feed) => {
      return (item1.created_at > item2.created_at ? -1 : 1);
    });
  }

  lastEntry(scanner: Scanner): string {

    let createdAt = '';

    if (scanner && this.feeds && this.feeds.length > 0) {
      
      let sortedFeeds = this.sortFeedsFromLatest(this.feeds);

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
