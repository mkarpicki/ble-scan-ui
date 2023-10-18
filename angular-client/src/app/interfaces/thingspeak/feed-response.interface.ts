import { IChannel } from './channel.interface';
import { IFeed } from './feed.interface';

export interface IFeedResponse {
    channel: IChannel;
    feeds: IFeed[];
}