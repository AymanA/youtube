import {
  Injectable
} from '@angular/core';
import {
  HttpService
} from '../../services/http.service';
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
    return this.httpService.get(`videos/?id=${id}&part=snippet,contentDetails,statistics`)
      .map(response => response.json());
  }

}
