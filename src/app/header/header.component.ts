import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../services/logger.service';
import { Router, ActivatedRoute, NavigationStart, Event, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchQuery = '';
  currentUrl;
  constructor(private logger: LoggerService,  private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd ) {
        this.currentUrl = event.url;
        this.logger.log('HeaderComponent', 'init', this.currentUrl, event);
        this.getCurrentPath();
      }
    });


    this.route
      .queryParams
      .subscribe(params => {
        this.searchQuery = params['query'] || '';
      });
  }
  searchClick() {
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
