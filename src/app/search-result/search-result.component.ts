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

  constructor(private youtubeService: YoutubeService, private logger: LoggerService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.searchQuery = params['query'] || '';
        this.logger.log('SearchResultComponent', 'init', params);
        this.getQueryResult(this.searchQuery);
      });
  }
  getQueryResult(query: string) {
    this.youtubeService.getQueryResult(query)
      .subscribe(res => {
        this.logger.log('SearchResultComponent', 'getQueryResult', res);
        this.resultList = res.items;
        this.nextPageToken = res.nextPageToken;
      });
  }

  loadMoreItems() {
    this.loadingMoreData = true;
    this.scrolled = true;
    this.youtubeService.getMoreItems(this.searchQuery, this.nextPageToken)
    .debounceTime(4000)
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
