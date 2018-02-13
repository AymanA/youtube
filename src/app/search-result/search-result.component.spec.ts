import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultComponent } from './search-result.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterComponent } from '../filter/filter.component';
import { YoutubeService } from '../services/youtube.service';
import { LoggerService } from '../services/logger.service';
import { DataService } from '../services/data.service';
import { Config } from '../app.config';
import { HttpService } from '../services/http.service';
import { ResultListComponent } from '../result-list/result-list.component';
import { ShowMoreItemsComponent } from '../show-more-items/show-more-items.component';
import { DropdownFilterComponent } from '../dropdown-filter/dropdown-filter.component';
import { ChannelCardComponent } from '../result-list/channel-card/channel-card.component';
import { VideoCardComponent } from '../result-list/video-card/video-card.component';
import { PlaylistCardComponent } from '../result-list/playlist-card/playlist-card.component';
import { NumberPrecisionPipe } from '../common/pipes/number-precision.pipe';
import { MomentModule } from 'angular2-moment';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        MomentModule,
        NoopAnimationsModule,
        HttpClientTestingModule
    ],
      declarations: [
        SearchResultComponent,
        FilterComponent,
        ResultListComponent,
        ShowMoreItemsComponent,
        DropdownFilterComponent,
        ChannelCardComponent,
        VideoCardComponent,
        PlaylistCardComponent,
        NumberPrecisionPipe
      ],
      providers: [
        YoutubeService,
        LoggerService,
        DataService,
        Config,
        HttpService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
