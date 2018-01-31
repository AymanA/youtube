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
export class VideoService {

  constructor(private httpService: HttpService) {}

  getVideoDetailsById(id: string) {
    return this.httpService.get(`videos?id=${id}&part=snippet,contentDetails,statistics`)
      .map(response => response.json());
  }
  getVideoStatistics(id: string) {
    return this.httpService.get(`videos?id=${id}&part=statistics`)
      .map(response => response.json());
  }

  getVideoViewDetailsById(id: string) {
    return this.httpService.get(`videos?id=${id}&part=snippet,contentDetails,statistics,player`)
      .map(response => response.json());
  }

  getRelatedVideos(id: string) {
    return this.httpService.get(`search?relatedToVideoId=${id}&part=snippet&type=video`)
      .map(response => response.json());
  }

}
