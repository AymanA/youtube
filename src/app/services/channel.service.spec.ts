import { TestBed, inject } from '@angular/core/testing';

import { ChannelService } from './channel.service';
import { HttpService } from './http.service';
import { HttpModule } from '@angular/http';
import { Config } from '../app.config';

describe('ChannelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
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
