import { TestBed, inject } from '@angular/core/testing';

import { HttpService } from './http.service';
import { Config } from '../app.config';
import { ProgressBarService } from './progress-bar.service';

describe('HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpService,
        Config,
        ProgressBarService
      ]
    });
  });

  it('should be created', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));
});
