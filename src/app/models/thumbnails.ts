import { Url } from './url';

export interface Thumbnails {
    default: Url;
    high: Url;
    medium: Url;
    maxres?: Url;
    standard?: Url;
}
