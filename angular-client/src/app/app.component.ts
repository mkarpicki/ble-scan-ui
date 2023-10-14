import { Component } from '@angular/core';
import { FeedService } from './services/feed.service';
import { FeedResponse } from './interfaces/thingspeak/feed-response.interface';
import { Feed } from './interfaces/thingspeak/feed.interface';
import { Channel } from './interfaces/thingspeak/channel.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-client';
  feedResponse?: FeedResponse; 
  feeds?: Feed [];
  channel?: Channel;

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.readFeed();
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
