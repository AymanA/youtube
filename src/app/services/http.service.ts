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

@Injectable()
export class HttpService extends Http {
  // @TODO Make progress bar based on request payload and progressevent
  pendingRequests = 0;
  spinner: BehaviorSubject < boolean > = new BehaviorSubject < boolean > (false);
  headers = new Headers({
    'Content-Type': 'application/json'
  });
  headersOpt = new RequestOptions({
    headers: this.headers
  });

  constructor(backend: XHRBackend, defaultOptions: RequestOptions,
    private cfg: Config, private appRef: ApplicationRef) {
      super(backend, defaultOptions);
  }
  queryParameters = `&key=${this.cfg.apiKey}`;

  // @TODO repeat request if request fail
  get(url: string, options: RequestOptionsArgs = this.headersOpt): Observable < Response > {
    url = this.cfg.apiUrl + url + this.queryParameters;
    this.pendingRequests++;
    this.spinner.next(true);
    return super.get(url, options).do(res => {
      this.handleRequestEnd();
    }, err => {
      this.handleRequestEnd();
      this.handleError(err);
    });
  }

  private handleRequestEnd() {
    this.pendingRequests--;
    if (this.pendingRequests === 0) {
      this.spinner.next(false);
      this.appRef.tick();
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
