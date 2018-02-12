import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ResultListComponent } from './result-list/result-list.component';
import { Config } from './app.config';
import { HttpService } from './services/http.service';
import { HttpModule } from '@angular/http';
import { YoutubeService } from './services/youtube.service';
import { VideoCardComponent } from './result-list/video-card/video-card.component';
import { ChannelCardComponent } from './result-list/channel-card/channel-card.component';
import { VideoService } from './services/video.service';
import { LoggerService } from './services/logger.service';
import { NumberPrecisionPipe } from './common/pipes/number-precision.pipe';
import { ChannelService } from './services/channel.service';
import { ChannelViewComponent } from './channel/channel-view/channel-view.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { VideoViewComponent } from './video/video-view/video-view.component';
import { FilterComponent } from './filter/filter.component';
import { ShowMoreItemsComponent } from './show-more-items/show-more-items.component';
import {MdProgressBarModule} from '../../node_modules/@angular2-material/progress-bar/progress-bar';
import { DataService } from './services/data.service';
import { DropdownFilterComponent } from './dropdown-filter/dropdown-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlaylistCardComponent } from './result-list/playlist-card/playlist-card.component';
import { PlaylistService } from './services/playlist.service';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';
import { BrowserXhr } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProgressBarService } from './services/progress-bar.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResultListComponent,
    VideoCardComponent,
    ChannelCardComponent,
    NumberPrecisionPipe,
    ChannelViewComponent,
    SearchResultComponent,
    VideoViewComponent,
    FilterComponent,
    ShowMoreItemsComponent,
    DropdownFilterComponent,
    PlaylistCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    // HttpModule,
    AppRoutingModule,
    MomentModule,
    MdProgressBarModule,
    BrowserAnimationsModule,
    NgProgressModule
  ],
  providers: [
    // HttpService,
    Config,
    YoutubeService,
    VideoService,
    LoggerService,
    ChannelService,
    DataService,
    PlaylistService,
    {provide: BrowserXhr, useClass: NgProgressBrowserXhr},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpService,
      multi: true
    },
    ProgressBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
