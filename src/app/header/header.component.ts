import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../services/logger.service';
import { Router, ActivatedRoute, NavigationStart, Event, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../services/http.service';
import { SearchDataService } from '../services/search-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchQuery = '';
  currentUrl;
  spinner = false;
  constructor(private logger: LoggerService,  private router: Router,
    private route: ActivatedRoute, private httpService: HttpService,
    private searchDataService: SearchDataService) { }

  ngOnInit() {
    this.searchDataService.searchQuery.subscribe(value => this.searchQuery = value);
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd ) {
        this.currentUrl = event.url;
        this.logger.log('HeaderComponent', 'init', this.currentUrl, event);
        this.getCurrentPath();
      }
    });

    this.route.queryParams.subscribe(params => {
        this.searchQuery = params['query'] || '';
      });

    this.httpService.spinner.subscribe((val: boolean) => {
      this.spinner = val;
      this.logger.log('HeaderComponent', 'init', 'spinner', this.spinner);
    });

  }
  searchClick() {
    this.searchDataService.searchQuery.next(this.searchQuery);
    this.router.navigate(['search'], { queryParams: { query: this.searchQuery } });
  }

  getCurrentPath() {
    if (!this.currentUrl) {
      return;
    }
    const regExp = /^\/(.*?)(\?|\/)/;
    const routePath = regExp.exec(this.currentUrl);
    return routePath ? routePath[1] : routePath;
  }
}
