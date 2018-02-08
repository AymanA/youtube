import { TestBed, inject } from '@angular/core/testing';

import { PlaylistService } from './playlist.service';
import { Config } from '../app.config';
import { HttpService } from './http.service';
import { HttpModule } from '@angular/http';

describe('PlaylistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
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
