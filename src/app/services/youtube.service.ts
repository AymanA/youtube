import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import 'rxjs/add/operator/map';
import { Http, Headers, Response } from '@angular/http';
import { Config } from '../app.config';

@Injectable()
export class YoutubeService {

  constructor(private httpService: HttpService,
    private cfg: Config, ) { }

  getQueryResult(query: any) {
    query = query ? query : '';
    return this.httpService.get(`search/?q=${query}&part=snippet&maxResults=${this.cfg.resultLimit}`)
    .map(response => response.json());
  }
}
