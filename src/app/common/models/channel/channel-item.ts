import { ChannelContentDetails } from './channel-content-details';
import { ChannelDetailedSnippet } from './channel-detailed-snippet';
import { ChannelStatistics } from './channel-statistics';

export interface ChannelItem {
    contentDetails: ChannelContentDetails;
    etag: string;
    id: string;
    kind: string;
    snippet: ChannelDetailedSnippet;
    statistics: ChannelStatistics;
}
