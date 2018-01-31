import { Localized } from './localized';
import { Thumbnails } from '../../thumbnails';

export interface VideoDetailedSnippet {
    categoryId: string;
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    channelTitle: string;
    liveBroadcastContent: string;
    localized: Localized;
    tags: string[];
    thumbnails: Thumbnails;
}
