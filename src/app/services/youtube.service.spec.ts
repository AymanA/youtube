import { TestBed, inject } from '@angular/core/testing';

import { YoutubeService } from './youtube.service';
import { HttpModule } from '@angular/http';
import { Config } from '../app.config';
import { HttpService } from './http.service';

describe('YoutubeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        YoutubeService,
        HttpService,
        Config
      ]
    });
  });

  it('should be created', inject([YoutubeService], (service: YoutubeService) => {
    expect(service).toBeTruthy();
  }));
});
