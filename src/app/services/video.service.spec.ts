import { TestBed, inject } from '@angular/core/testing';

import { VideoService } from './video.service';
import { Config } from '../app.config';
import { HttpService } from './http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        VideoService,
        HttpService,
        Config
      ]
    });
  });

  it('should be created', inject([VideoService], (service: VideoService) => {
    expect(service).toBeTruthy();
  }));
});
