import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class PlaylistService {

  constructor(private httpService: HttpService) { }

  getPlaylistItemsCountById(playlistId: string) {
    return this.httpService.get(`playlists?id=${playlistId}&part=contentDetails`)
      .map(response => response.json());
  }
  getPlaylistItemsById(playlistId: string) {
    return this.httpService.get(`playlistItems?playlistId=${playlistId}&part=contentDetails`)
      .map(response => response.json());
  }

}
