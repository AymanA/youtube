import {ApplicationRef, ChangeDetectorRef, Injectable} from '@angular/core';
import {Http, Headers, RequestOptionsArgs, RequestOptions, Response, XHRBackend} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Config} from '../app.config';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';

@Injectable()
export class HttpService extends Http {
 headers = new Headers({ 'Content-Type': 'application/json' });
 headersOpt = new RequestOptions({ headers: this.headers });
  constructor(backend: XHRBackend,
              defaultOptions: RequestOptions,
              private cfg: Config,
              private appRef: ApplicationRef) {
    super(backend, defaultOptions);
  }
  queryParameters = `&part=snippet&maxResults=${this.cfg.resultLimit}&key=${this.cfg.apiKey}`;

  get(url: string, options: RequestOptionsArgs = this.headersOpt): Observable<Response> {
    url = this.cfg.apiUrl + url + this.queryParameters;
    return super.get(url, options).do(res => {
    }, err => {
      this.handleError(err);
    });
}

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    url = this.cfg.apiUrl + url + this.queryParameters;
    return super.post(url, body, options).do(res => {
    }, err => {
      this.handleError(err);
    });
  }

  put(url: string, body?: any, options?: RequestOptionsArgs): Observable<Response> {
    url = this.cfg.apiUrl + url + this.queryParameters;
    return super.put(url, body, options).do(res => {
    }, err => {      this.handleError(err);
    });
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.cfg.apiUrl + url + this.queryParameters;
    return super.delete(url, options).do( res => {
    }, err => {
      this.handleError(err);
    });
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    url = this.cfg.apiUrl + url + this.queryParameters;
    const patchMethod = super.patch(url, body, options);
    patchMethod.subscribe(() => {
    }, err => {
      this.handleError(err);
    });

    return patchMethod;
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.cfg.apiUrl + url + this.queryParameters;
    const headMethod = super.head(url, options);
    headMethod.subscribe(() => {
    }, err => {
      this.handleError(err);
    });
    return headMethod;
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.cfg.apiUrl + url + this.queryParameters;
    const optionsMethod = super.options(url, options);
    optionsMethod.subscribe(() => {
    }, err => {
      this.handleError(err);
    });
    return optionsMethod;
  }


  handleError(errResponse) {
    let errMsg = '';
    if (errResponse instanceof Response) {
      const body   = errResponse.json() || '';
      const error  = body.error || JSON.stringify(body);
      errMsg = `${errResponse.status} - ${errResponse.statusText} || ''} ${error}`;
    } else {
      errMsg = errResponse.message ? errResponse.message : errResponse.toString();
    }
    return Observable.throw(errMsg);
  }
}
