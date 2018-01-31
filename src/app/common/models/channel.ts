import { ChannelId } from './channel-id';
import { Snippet } from './snippet';

export interface Channel {
    etag: string;
    id: ChannelId;
    kind: string;
    snippet: Snippet;
}
