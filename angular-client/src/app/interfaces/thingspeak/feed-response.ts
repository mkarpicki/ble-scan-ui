import { Channel } from './channel.interface';
import { Feed } from './feed.interface';

export interface FeedResponse {
    channel: Channel;
    feeds: Feed[];
}