import { ContentDetails } from './content-details';
import { VideoDetailedSnippet } from './video-detailed-snippet';
import { VideoStatistics } from './video-statistics';

export interface VideoItem {

contentDetails: ContentDetails;
etag: string;
id: string;
kind: string;
snippet: VideoDetailedSnippet;
statistics: VideoStatistics;
}
