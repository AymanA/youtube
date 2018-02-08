import { TestBed, inject } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpModule } from '@angular/http';
import { Config } from '../app.config';

describe('HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        HttpService,
        Config
      ]
    });
  });

  it('should be created', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));
});
