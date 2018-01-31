import { Thumbnails } from './thumbnails';

export interface Snippet {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishedAt: string;
    thumbnails: Thumbnails;
    title: string;
}
