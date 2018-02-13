import { TestBed, inject } from '@angular/core/testing';

import { PlaylistService } from './playlist.service';
import { Config } from '../app.config';
import { HttpService } from './http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PlaylistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PlaylistService,
        HttpService,
        Config]
    });
  });

  it('should be created', inject([PlaylistService], (service: PlaylistService) => {
    expect(service).toBeTruthy();
  }));
});
