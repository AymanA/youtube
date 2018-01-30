import { ChannelId } from './channelId';
import { Snippet } from './snippet';

export interface Channel {
    etag: string;
    id: ChannelId;
    kind: string;
    snippet: Snippet;
}
