import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';
import { LoggerService } from './logger.service';
import { Config } from '../app.config';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        LoggerService,
        Config
      ]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
