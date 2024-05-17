import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { FeedService } from './services/feed.service';

import { FeedResponse } from './types/thingspeak/feed-response';
import { Feed } from './types/thingspeak/feed';
import { Channel } from './types/thingspeak/channel';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'BLE scanner';
  feedResponse?: FeedResponse; 
  feeds?: Feed [];
  channel?: Channel;

  private subscription?: Subscription;
  private SECONDS = 5;

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    
    const source = interval(this.SECONDS * 1000);
    this.subscription = source.subscribe(val => {
      this.readFeed();      
    });
    this.readFeed();        
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  readFeed(): void {
    
    this.feedService.read()
        .subscribe(feedResponse => {         
          this.feedResponse = feedResponse;
          this.channel = feedResponse.channel;
          this.feeds = feedResponse.feeds;
        });
  }

}
