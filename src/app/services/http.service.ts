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
  Response,
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
  headers = new Headers({
    'Content-Type': 'application/json'
  });
  headersOpt = new RequestOptions({
    headers: this.headers
  });
  baseUrl = this.cfg.apiUrl;
  queryParameters = `&key=${this.cfg.apiKey}`;
  header = new HttpHeaders();

  constructor(private cfg: Config, private progressBarService: ProgressBarService) {
    this.header.append('Content-Length', '');
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

                    if (event.type === HttpEventType.DownloadProgress) {
                      // This is an download progress event. Compute and show the % done:
    const percentDone = Math.round(100 * event.loaded / event['total']);
                        console.log('Download progress event', event);
                        console.log(`progress event File is ${percentDone}% downloaded.`, event['total']);
                    }

                    if (event.type === HttpEventType.UploadProgress) {
                        console.log('Upload progress event', event);
                    }

                    if (event.type === HttpEventType.Response) {
                        console.log('response received...', event.body);
                        this.handleRequestEnd();
                    }

                } , error => {
          this.handleRequestEnd();
          this.handleError(error);
        });
    }


    private getEventMessage(event: HttpEvent<any>, file?: File) {
      switch (event.type) {
        case HttpEventType.Sent:
          return `Uploading file "${file.name}" of size ${file.size}.`;

        case HttpEventType.UploadProgress:
          // Compute and show the % done:
          const percentDone = Math.round(100 * event.loaded / event.total);
          return `File "${file.name}" is ${percentDone}% uploaded.`;

        case HttpEventType.Response:
          return `File "${file.name}" was completely uploaded!`;

        default:
          return `File "${file.name}" surprising upload event: ${event.type}.`;
      }
    }

  //   const request = new HttpRequest(
  //     "POST", "/api/test-request", {},
  //      {reportProgress: true});

  // this.http.request(request)
  //     .subscribe(
  //         event => {

  //             if (event.type === HttpEventType.DownloadProgress) {
  //                 console.log("Download progress event", event);
  //             }

  //             if (event.type === HttpEventType.UploadProgress) {
  //                 console.log("Upload progress event", event);
  //             }

  //             if (event.type === HttpEventType.Response) {
  //                 console.log("response received...", event.body);
  //             }

  //         }
// );
  // @TODO Make progress bar based on request payload and progressevent


  // constructor( defaultOptions: RequestOptions,
  //   private cfg: Config, private appRef: ApplicationRef) {
  //   super();
  // }
  // queryParameters = `&key=${this.cfg.apiKey}`;

  // // @TODO repeat request if request fail
  // get(url: string, options: RequestOptionsArgs = this.headersOpt): Observable < Response > {
  //   url = this.cfg.apiUrl + url + this.queryParameters;
  //   this.pendingRequests++;
  //   this.spinner.next(true);
  //   return super.get(url, options).do(res => {
  //     this.handleRequestEnd();
  //   }, err => {
  //     this.handleRequestEnd();
  //     this.handleError(err);
  //   });
  // }

  handleRequestEnd() {
    this.pendingRequests--;
    if (this.pendingRequests === 0) {
      this.progressBarService.spinner.next(false);
      // this.appRef.tick();
    }
  }

  handleError(errResponse) {
    let errMsg = '';
    if (errResponse instanceof Response) {
      const body = errResponse.json() || '';
      const error = body.error || JSON.stringify(body);
      errMsg = `${errResponse.status} - ${errResponse.statusText} || ''} ${error}`;
    } else {
      errMsg = errResponse.message ? errResponse.message : errResponse.toString();
    }
    return Observable.throw(errMsg);
  }
}
