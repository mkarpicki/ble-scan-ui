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

  //move to service (helper)
  getFeedScannerId(feed: Feed): string {
    return feed['field1'];
  }

  //move to service (helper)
  getFeedCreationDate(feed: Feed): string {
    return feed['created_at'];
  }

  lastEntry(scanner: Scanner): string {

    let createdAt = '';

    if (scanner && this.feeds && this.feeds.length > 0) {
      this.feeds?.forEach(feed => {
        //if (this.getFeedScannerId(feed) === this.)
      });
    }

    return createdAt;
  }

}
