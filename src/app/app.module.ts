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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResultListComponent
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
    YoutubeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
