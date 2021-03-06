import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FilterObject } from '../common/models/custom-models/filter-object';


@Injectable()
export class DataService {
  defaultFilter: FilterObject[] = [];
  searchQuery: BehaviorSubject<string> = new BehaviorSubject<string>('');
  totalResult: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  filterParameters: BehaviorSubject<FilterObject[]> = new BehaviorSubject([]);
  filterString: BehaviorSubject<string> = new BehaviorSubject('');
  channelTitle: BehaviorSubject<string> = new BehaviorSubject('');
  currentRoute: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private logger: LoggerService) {
    this.defaultFilter.push({filterValue: 'relevance', queryParamName: 'order'});
    this.filterParameters.next(this.defaultFilter);
  }
}
