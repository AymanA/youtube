import { PageInfo } from './page-info';
import { VideoItem } from './video/videoItem/video-item';
import { ChannelItem } from './channel/channel-item';

export interface ListItemContent<T> {
    kind: string;
    etag: string;
    pageInfo: PageInfo;
    items: T;
}

