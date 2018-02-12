import {
  ApplicationRef,
  ChangeDetectorRef,
  Injectable
} from '@angular/core';
import {
  Http,
  Headers,
  RequestOptionsArgs,
  RequestOptions,
  XHRBackend
} from '@angular/http';
import {
  Observable
} from 'rxjs/Observable';
import {
  BehaviorSubject
} from 'rxjs/BehaviorSubject';
import {
  Config
} from '../app.config';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import {
  HttpClient,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaderResponse,
  HttpSentEvent,
  HttpProgressEvent,
  HttpUserEvent,
  HttpResponse,
  HttpEventType,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';
import {
  ProgressBarService
} from './progress-bar.service';

@Injectable()
export class HttpService implements HttpInterceptor {
  pendingRequests = 0;
  baseUrl = this.cfg.apiUrl;
  queryParameters = `&key=${this.cfg.apiKey}`;

  constructor(private cfg: Config, private progressBarService: ProgressBarService) {

  }
  intercept(req: HttpRequest < any > , next: HttpHandler):
    Observable < HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse < any > | HttpUserEvent < any >> {
      console.log(req, next);
      const newReq = req.clone({
        url: this.baseUrl + req.url + this.queryParameters,
        reportProgress: true
      });
      this.pendingRequests++;
      this.progressBarService.spinner.next(true);
      return next.handle(newReq)
        .do(
          event => {
            // @TODO work with progress service with pig requests
            if (event.type === HttpEventType.DownloadProgress) {
              // This is an download progress event. Compute and show the % done:
              const percentDone = Math.round(100 * event.loaded / event['total']);
              console.log('Download progress event', event);
              console.log(`progress event File is ${percentDone}% downloaded.`, event['loaded'], event['total']);
            }

            if (event.type === HttpEventType.UploadProgress) {
              console.log('Upload progress event', event);
            }

            if (event.type === HttpEventType.Response) {
              console.log('progress event response received...', event.body);
              this.handleRequestEnd();
            }

          }, error => {
            this.handleRequestEnd();
            this.handleError(error);
          });
    }

  handleRequestEnd() {
    this.pendingRequests--;
    if (this.pendingRequests === 0) {
      this.progressBarService.spinner.next(false);
    }
  }

  handleError(errResponse) {
    let errMsg = '';
    if (errResponse instanceof Response) {
      const body = errResponse.json() || '';
      const error = body || JSON.stringify(body);
      errMsg = `${errResponse.status} - ${errResponse.statusText} || ''} ${error}`;
    } else {
      errMsg = errResponse.message ? errResponse.message : errResponse.toString();
    }
    return Observable.throw(errMsg);
  }
}
