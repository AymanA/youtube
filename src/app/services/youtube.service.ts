import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Http, Headers, Response } from '@angular/http';
import { Config } from '../app.config';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
export interface SearchResult {
  etag: string;
  items: any;
  kind: string;
  nextPageToken: string;
  pageInfo: any;
  regionCode: string;
}

@Injectable()
export class YoutubeService {

  constructor(private httpService: HttpClient,
    private cfg: Config, ) { }

  getQueryResult(query: string, filter?: string) {
    query = query ? query : '';
    let queryParams = `search/?q=${query}&part=snippet&maxResults=${this.cfg.resultLimit}`;
    if (filter) {
      queryParams += filter;
    }
    return this.httpService.get(queryParams)
    .map(response => response);
  }

  getMoreItems(query: string, nextPageToken: string, filter?: string) {
    query = query ? query : '';
    let queryParams = `search/?q=${query}&pageToken=${nextPageToken}&part=snippet&maxResults=${this.cfg.resultLimit}`;
    if (filter) {
      queryParams += filter;
    }
    return this.httpService.get(queryParams)
    .map(response => response);

  }
}
