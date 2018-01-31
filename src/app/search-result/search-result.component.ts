import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../services/youtube.service';
import { LoggerService } from '../services/logger.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  searchQuery: string;
  resultList: any[];
  constructor(private youtubeService: YoutubeService, private logger: LoggerService,
    private route: ActivatedRoute) { }

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
      });
    }
}
