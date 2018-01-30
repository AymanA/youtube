import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../services/youtube.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchQuery =  'spongebob';
  resultList: any[];
  constructor(private youtubeService: YoutubeService) { }

  ngOnInit() {
  }
  getQueryResult() {
    this.youtubeService.getQueryResult(this.searchQuery)
    .subscribe(res => {
      console.log(res.items);
      this.resultList = res.items;
      });
    }
}
