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
import {
  HttpClient
} from '@angular/common/http';
import * as _ from 'lodash';

export interface VideoResult {
  etag: string;
  items: any;
  kind: string;
  pageInfo: any;
}

@Injectable()
export class VideoService {

  constructor(private httpService: HttpClient) {}

  getVideoDetailsById(id: string) {
    return this.httpService.get(`videos?id=${id}&part=snippet,contentDetails,statistics`)
      .map(response => (response));
  }
  getVideoStatistics(id: string) {
    return this.httpService.get(`videos?id=${id}&part=statistics`)
      .map(response => (response));
  }

  getVideoViewDetailsById(id: string) {
    return this.httpService.get(`videos?id=${id}&part=snippet,contentDetails,statistics,player`)
      .map(response => (response));
  }

  getRelatedVideos(id: string) {
    return this.httpService.get(`search?relatedToVideoId=${id}&part=snippet&type=video`)
      .map(response => (response));
  }

}
