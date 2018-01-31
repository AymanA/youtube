import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../services/logger.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchQuery = '';
  constructor(private logger: LoggerService,  private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.route
      .queryParams
      .subscribe(params => {
        this.searchQuery = params['query'] || '';
      });
  }
  searchClick() {
    this.router.navigate(['search'], { queryParams: { query: this.searchQuery } });
  }
}
