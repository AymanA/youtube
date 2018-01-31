import { PageInfo } from './page-info';
import { VideoItem } from './videoItem/video-item';

export interface VideoContent {
    kind: string;
    etag: string;
    pageInfo: PageInfo;
    items: VideoItem[];
}

