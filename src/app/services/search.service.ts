import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SearchService {
  searchQuery: BehaviorSubject<string> = new BehaviorSubject<string>('');
  totalResult: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(private logger: LoggerService) {
    logger.log('CurrentProjectService initialized', this);
  }
}
