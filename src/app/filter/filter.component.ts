import { Component, OnInit, Input, HostListener } from '@angular/core';
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
    {value: 'all', name: 'All', visible: true, mobile: true},
    {value: 'video', name: 'Video', visible: true, mobile: false},
    {value: 'channel', name: 'Channel', visible: true, mobile: true},
    {value: 'playlist', name: 'Playlist', visible: true, mobile: true}
    ];


  uploadDateFilters = [
    {value: 'any', name: 'Any time', visible: true, mobile: true},
    {value: 'hour', name: 'Last hour', visible: true, mobile: false},
    {value: 'today', name: 'Today', visible: true, mobile: true},
    {value: 'week', name: 'This week', visible: true, mobile: true},
    {value: 'month', name: 'This month', visible: true, mobile: true}
  ];

  orderFilters = [
    {value: 'relevance', name: 'Relevance'},
    {value: 'date', name: 'Upload date'},
    {value: 'viewCount', name: 'View count'},
    {value: 'rating', name: 'Rating'}
  ];

  totalResults;
  typeFilterTitle =  {name: 'All'};
  UploadTimeFilterTitle =  {name: 'Any time'};
  OrderFilterTitle = {name: 'Relevance'};
  selectedTypeFilter;
  selectedUploadTimeFilter;
  selectedOrderFilter;
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

  filterResultsByType(type) {
    this.selectedTypeFilter = type;
    this.logger.log('FilterComponent', 'filterResultsByType', type);
  }

  filterResultsByDate(type) {
    this.selectedUploadTimeFilter = type;
    this.logger.log('FilterComponent', 'filterResultsByDate', type);
  }


}
