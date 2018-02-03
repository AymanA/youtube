import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../services/search.service';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  // @TODO make constant file for all Enums
  typeFilters = [
      {value: 'all', name: 'All'},
      {value: 'channel', name: 'Channel'},
      {value: 'playlist', name: 'Playlist'}
    ];


  uploadDateFilters = [
    {value: 'any', name: 'Any time'},
    {value: 'today', name: 'Today'},
    {value: 'week', name: 'This week'},
    {value: 'month', name: 'This week'}
  ];

  orderFilters = [
    {value: 'relevance', name: 'Relevance'},
    {value: 'date', name: 'Upload date'},
    {value: 'viewCount', name: 'View count'},
    {value: 'rating', name: 'Rating'}
  ];

  totalResults;
  selectedType = 'all';
  selectedUploadTime = 'any';
  selectedOrder = 'relevance';
  // showFiltersGroup = false;
  showFiltersGroup = true;

  constructor(private logger: LoggerService, private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.totalResult.subscribe(value => {
      this.formatTotalResult(value);
    });
  }
  formatTotalResult(totalResult: number) {
    this.logger.log('FilterComponent', 'formatTotalResult', totalResult);
    this.totalResults = totalResult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  toggleFiltersGroupVisibilty() {
    this.showFiltersGroup = !this.showFiltersGroup;
    console.log('hide', this.showFiltersGroup);
  }
  // @TODO Implement filters feature
  ResultByfilters() {}


}
