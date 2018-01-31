import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../services/youtube.service';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchQuery =  'spongebob';
  resultList: any[];
  constructor(private youtubeService: YoutubeService, private logger: LoggerService) { }

  ngOnInit() {
  }
  getQueryResult() {
    this.youtubeService.getQueryResult(this.searchQuery)
    .subscribe(res => {
      this.logger.log('HeaderComp', 'getQueryResult', res);
      this.resultList = res.items;
      });
    }
}
