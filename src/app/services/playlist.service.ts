import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class PlaylistService {

  constructor(private httpService: HttpService) { }

  getPlaylistItemsCountById(id: string) {
    return this.httpService.get(`playlists?id=${id}&part=contentDetails`)
      .map(response => response.json());
  }

}
