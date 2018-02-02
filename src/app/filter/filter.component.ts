import { Component, OnInit } from '@angular/core';

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

  selectedType = 'all';
  selectedUploadTime = 'any';
  selectedOrder = 'relevance';
  constructor() { }

  ngOnInit() {
  }

  // @TODO Implement filters feature
  ResultByfilters() {}

}
