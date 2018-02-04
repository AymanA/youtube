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
import { SearchService } from '../services/search.service';
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
    private route: ActivatedRoute, private searchService: SearchService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.searchQuery = params['query'] || '';
        this.logger.log('SearchResultComponent', 'init', params);
        this.getQueryResult(this.searchQuery);
      });

    this.searchService.filterParameters.subscribe( filters => {
      console.log('vipissuefilters', filters);
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
    this.searchService.filterString.next(filterString);
    this.getQueryResult(this.searchQuery, filterString);
  }

  getQueryResult(query: string, filterQuery?: string) {
    this.youtubeService.getQueryResult(query, filterQuery)
      .subscribe(res => {
        this.logger.log('SearchResultComponent', 'getQueryResult', res);
        this.resultList = res.items;
        this.nextPageToken = res.nextPageToken;
        this.searchService.totalResult.next(res.pageInfo.totalResults);
      });
  }

  loadMoreItems() {
    this.loadingMoreData = true;
    this.scrolled = true;
    const filterString: string = this.searchService.filterString.getValue();
    this.youtubeService.getMoreItems(this.searchQuery, this.nextPageToken, filterString)
    .debounceTime(2000)
    .distinctUntilChanged()
    .subscribe(res => {
        this.logger.log('SearchResultComponent', 'loadMoreItems', res);
        this.resultList = this.resultList.concat(res.items);
        this.nextPageToken = res.nextPageToken;
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
    let bodyHeight = document.body.offsetHeight;
    if (document.documentElement.clientWidth >= 768) {
      bodyHeight = bodyHeight + 65;
    }
    if (!this.scrolled && ((window.innerHeight + window.scrollY) === bodyHeight)) {
      this.loadMoreItems();
    }
  }
}
