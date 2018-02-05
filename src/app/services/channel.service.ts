import {
  Injectable
} from '@angular/core';
import {
  HttpService
} from './http.service';
import 'rxjs/add/operator/map';
import {
  Http,
  Headers,
  Response
} from '@angular/http';
@Injectable()
export class ChannelService {

  constructor(private httpService: HttpService) {}
  getChannelCardDetailsById(channelId: string) {
    return this.httpService.get(`channels?id=${channelId}&part=snippet,contentDetails,statistics`)
      .map(response => response.json());
  }

  getChannelViewDetailsById(channelId: string) {
    return this.httpService.get(`channels?id=${channelId}&part=snippet,contentDetails,statistics,brandingSettings`)
      .map(response => response.json());
  }

  getChannelSectionData(channelId: string) {
    return this.httpService.get(`channelSections?channelId=${channelId}&part=snippet,contentDetails`)
      .map(response => response.json());
  }

  // @TODO separate playlist & playlist items into separate services
  getPlaylistItems(playlistId: string) {
    return this.httpService.get(`playlistItems?playlistId=${playlistId}&part=snippet,contentDetails`)
      .map(response => response.json());
  }

  getChannelPlaylists(channelId) {
    return this.httpService.get(`playlists?channelId=${channelId}&part=snippet,contentDetails`)
      .map(response => response.json());
  }
}
