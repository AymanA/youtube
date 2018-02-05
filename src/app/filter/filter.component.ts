import { Component, OnInit, Input, HostListener } from '@angular/core';
import { SearchDataService } from '../services/search-data.service';
import { LoggerService } from '../services/logger.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  animations: [
    trigger('filterToggle', [
      state('show', style({
        display: 'inline-flex',
        height: '350px',
      })),
      state('hide', style({
        display: 'none',
        height: '0',
      })),
      transition('show <=> hide', animate('400ms linear')),
    ]),

   ]
})
export class FilterComponent implements OnInit {

  // @TODO make constant file for all Enums
  typeFilters = [
    {value: 'all', name: 'All', visible: true, mobile: true, other: false},
    {value: 'video', name: 'Video', visible: true, mobile: false, other: true},
    {value: 'channel', name: 'Channel', visible: true, mobile: true, other: true},
    {value: 'playlist', name: 'Playlist', visible: true, mobile: true, other: true}
    ];


  uploadDateFilters = [
    {value: 'any', name: 'Any time', visible: true, mobile: true, other: false},
    {value: 'hour', name: 'Last hour', visible: true, mobile: false, other: true},
    {value: 'today', name: 'Today', visible: true, mobile: true, other: true},
    {value: 'week', name: 'This week', visible: true, mobile: true, other: true},
    {value: 'month', name: 'This month', visible: true, mobile: true, other: true}
  ];

  orderFilters = [
    {value: 'relevance', name: 'Relevance', visible: true, mobile: false, other: true},
    {value: 'date', name: 'Upload date', visible: true, mobile: false, other: true},
    {value: 'viewCount', name: 'View count', visible: true, mobile: false, other: true},
    {value: 'rating', name: 'Rating', visible: true, mobile: false, other: true}
  ];

  totalResults;
  typeFilterTitle =  {name: 'All'};
  UploadTimeFilterTitle =  {name: 'Any time'};
  OrderFilterTitle = {name: 'Relevance'};
  selectedTypeFilter;
  selectedUploadTimeFilter;
  selectedOrderFilter;
  showFiltersGroup = 'hide';

  constructor(private logger: LoggerService, private searchDataService: SearchDataService) { }

  ngOnInit() {
    this.searchDataService.totalResult.subscribe(value => {
      this.formatTotalResult(value);
    });
  }

  formatTotalResult(totalResult: number) {
    this.logger.log('FilterComponent', 'formatTotalResult', totalResult);
    this.totalResults = totalResult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  toggleFiltersGroupVisibilty() {
    this.showFiltersGroup = this.showFiltersGroup === 'show' ? 'hide' : 'show';
    console.log('hide', this.showFiltersGroup);
  }


}
