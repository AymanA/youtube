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
import { VideoService } from './result-list/video-card/video.service';
import { LoggerService } from './services/logger.service';
import { NumberPrecisionPipe } from './common/number-precision.pipe';
import { ChannelService } from './result-list/channel-card/channel.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResultListComponent,
    VideoCardComponent,
    ChannelCardComponent,
    NumberPrecisionPipe
  ],
  imports: [
    BrowserModule,
    // routing,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MomentModule
  ],
  providers: [
    HttpService,
    Config,
    YoutubeService,
    VideoService,
    LoggerService,
    ChannelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
