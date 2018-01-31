import { Localized } from '../localized';
import { Thumbnails } from '../thumbnails';

export interface ChannelDetailedSnippet {
    description: string;
    localized: Localized;
    publishedAt: string;
    thumbnails: Thumbnails;
    title: string;
}
