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
export class ChannelService {

  constructor(private httpService: HttpService) { }
  getChannelDetailsById(id: string) {
    return this.httpService.get(`channels/?id=${id}&part=snippet,contentDetails,statistics`)
      .map(response => response.json());
  }
}
