import {
  TestBed,
  async
} from '@angular/core/testing';
import {
  RouterTestingModule
} from '@angular/router/testing';
import {
  AppComponent
} from './app.component';
import {
  HeaderComponent
} from './header/header.component';
import {
  MdProgressBar
} from '@angular2-material/progress-bar/progress-bar';
import {
  FormsModule
} from '@angular/forms';
import {
  LoggerService
} from './services/logger.service';
import {
  HttpService
} from './services/http.service';
import {
  XHRBackend,
  BrowserXhr,
  Http,
  ResponseOptions,
  BaseRequestOptions,
  HttpModule
} from '@angular/http';
import {
  NumberPrecisionPipe
} from './common/pipes/number-precision.pipe';
import { Config } from './app.config';
import { DataService } from './services/data.service';
describe('AppComponent', () => {
  beforeEach(async (() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        RouterTestingModule,

      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        MdProgressBar,
        NumberPrecisionPipe,
      ],
      providers: [
        LoggerService,
        HttpService,
        Config,
        DataService

      ]
    }).compileComponents();
  }));
  it('should create the app', async (() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async (() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

});
