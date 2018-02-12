import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable()
export class PlaylistService {

  constructor(private httpService: HttpClient) { }

  getPlaylistItemsCountById(playlistId: string) {
    return this.httpService.get(`playlists?id=${playlistId}&part=contentDetails`)
.map(response => (response));
  }
  getPlaylistItemsById(playlistId: string) {
    return this.httpService.get(`playlistItems?playlistId=${playlistId}&part=contentDetails`)
    .map(response => (response));
  }

}
