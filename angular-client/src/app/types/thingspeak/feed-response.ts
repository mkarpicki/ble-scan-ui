import { IFeedResponse } from '../../interfaces/thingspeak/feed-response.interface';

import { Channel } from './channel';
import { Feed } from './feed';

export class FeedResponse implements IFeedResponse {
    channel: Channel;
    feeds: Feed[];

    constructor(iFeedResponse: IFeedResponse) {

        this.channel = new Channel(iFeedResponse.channel);
        this.feeds = [];
        iFeedResponse.feeds?.forEach(iFeed => {
            this.feeds.push(new Feed(iFeed));
        });
    }
}