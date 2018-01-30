import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import 'rxjs/add/operator/map';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class YoutubeService {

  constructor(private httpService: HttpService) { }

  getQueryResult(query: any) {
    query = query ? query : '';
    return this.httpService.get(`search/?q=${query}`)
    .map(response => response.json());
  }
}
