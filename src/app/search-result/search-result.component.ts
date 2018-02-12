import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';
import {
  YoutubeService
} from '../services/youtube.service';
import {
  LoggerService
} from '../services/logger.service';
import {
  ActivatedRoute
} from '@angular/router';
import { DataService } from '../services/data.service';
import { FilterObject } from '../common/models/custom-models/filter-object';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  searchQuery: string;
  resultList: any[];
  nextPageToken: string;
  loadingMoreData = false;
  scrolled = false;
  totalResult;
  filters: FilterObject[];

  constructor(private youtubeService: YoutubeService, private logger: LoggerService,
    private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.searchQuery = params['query'] || '';
        this.logger.log('SearchResultComponent', 'init', params);
        this.getQueryResult(this.searchQuery);
      });

    this.dataService.filterParameters.subscribe( filters => {
      this.logger.log('SearchResultComponentSearchResultComponent', 'ngOnInit', 'issuefilters', filters);
      this.filters = filters;
      this.prepareQueryWithFilters(this.filters);
    });
  }

  prepareQueryWithFilters(filters: Array<FilterObject>) {
    let filterString = '';
    filters.forEach((element: FilterObject) => {
      filterString += `&${element.queryParamName}=${element.filterValue}` ;
    });
    this.logger.log('SearchResultComponent', 'prepareQueryWithFilters', filters);
    this.dataService.filterString.next(filterString);
    this.getQueryResult(this.searchQuery, filterString);
  }

  getQueryResult(query: string, filterQuery?: string) {
    this.youtubeService.getQueryResult(query, filterQuery)
      .subscribe((data: any) => {
        this.logger.log('SearchResultComponent', 'getQueryResult', data);
        this.resultList = data.items;
        this.nextPageToken = data.nextPageToken;
        this.dataService.totalResult.next(data.pageInfo.totalResults);
      });
  }

  loadMoreItems() {
    this.loadingMoreData = true;
    this.scrolled = true;
    const filterString: string = this.dataService.filterString.getValue();
    this.youtubeService.getMoreItems(this.searchQuery, this.nextPageToken, filterString)
    .debounceTime(2000)
    .distinctUntilChanged()
    .subscribe((data: any) => {
        this.logger.log('SearchResultComponent', 'loadMoreItems', data);
        this.resultList = this.resultList.concat(data.items);
        this.nextPageToken = data.nextPageToken;
        this.loadingMoreData = false;
        this.scrolled = false;
      }, err => {
        this.loadingMoreData = false;
        this.scrolled = false;
      });
  }
// @TODO debounce the scroll event
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (!this.scrolled && ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)) {
      this.loadMoreItems();
    }
  }
}
