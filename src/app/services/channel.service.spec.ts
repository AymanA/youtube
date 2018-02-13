import { TestBed, inject } from '@angular/core/testing';

import { ChannelService } from './channel.service';
import { HttpService } from './http.service';
import { Config } from '../app.config';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChannelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ChannelService,
        HttpService,
        Config
      ]
    });
  });

  it('should be created', inject([ChannelService], (service: ChannelService) => {
    expect(service).toBeTruthy();
  }));
});
