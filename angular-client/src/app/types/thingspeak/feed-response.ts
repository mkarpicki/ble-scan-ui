import { IChannel } from '../../interfaces/thingspeak/channel.interface';
import { IFeed } from '../../interfaces/thingspeak/feed.interface';
import { IFeedResponse } from '../../interfaces/thingspeak/feed-response.interface';

import { Channel } from './channel';
import { Feed } from './feed';

export class FeedResponse implements IFeedResponse {
    channel: IChannel;
    feeds: IFeed[];

    constructor(iChannel: IChannel, iFeeds: IFeed[]) {
        this.channel = new Channel(iChannel);
        this.feeds = [];
        iFeeds.forEach(iFeed => {
            this.feeds.push(new Feed(iFeed));
        });
    }
}