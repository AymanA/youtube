import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../services/logger.service';
import { Router, ActivatedRoute, NavigationStart, Event, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../services/http.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchQuery = '';
  currentUrl;
  spinner = false;
  showSearchBar = false;
  channelTitle;
  constructor(private logger: LoggerService,  private router: Router,
    private route: ActivatedRoute, private httpService: HttpService,
    private dataService: DataService) { }

  ngOnInit() {
    this.dataService.searchQuery.subscribe(value => this.searchQuery = value);
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd ) {
        this.currentUrl = event.url;
        this.logger.log('HeaderComponent', 'init', this.currentUrl, event);
        this.getCurrentPath();
      }
    });

    this.searchQuery = this.dataService.searchQuery.getValue();

    this.dataService.channelTitle.subscribe( title => {
      this.channelTitle = title;
      this.logger.log('HeaderComponent', 'channelTitle', title);
    });

    this.route.queryParams.subscribe(params => {
        this.searchQuery = params['query'] || this.dataService.searchQuery.getValue();
        this.dataService.searchQuery.next(this.searchQuery);
      });

    this.httpService.spinner.subscribe((val: boolean) => {
      this.spinner = val;
      this.logger.log('HeaderComponent', 'init', 'spinner', this.spinner);
    });

  }
  searchClick() {
    this.dataService.searchQuery.next(this.searchQuery);
    this.router.navigate(['search'], { queryParams: { query: this.searchQuery } });
    this.toggleSearchInput();
  }

  getCurrentPath() {
    if (!this.currentUrl) {
      return;
    }
    const regExp = /^\/(.*?)(\?|\/)/;
    const routePath = regExp.exec(this.currentUrl);
    const currentRoute = routePath ? routePath[1] : '';
    this.dataService.currentRoute.next(currentRoute);
    return currentRoute;
  }

  toggleSearchInput() {
    this.showSearchBar = !this.showSearchBar;
  }
}
