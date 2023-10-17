import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Scanner } from '../interfaces/scanner.interface';
import { SCANNERS } from '../data/scanners';
import { Feed } from '../interfaces/thingspeak/feed.interface';

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

}
