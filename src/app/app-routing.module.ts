import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ChannelViewComponent } from './channel/channel-view/channel-view.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { VideoViewComponent } from './video/video-view/video-view.component';

const appRoutes: Routes = [
  {path: 'channel/:id', component: ChannelViewComponent},
  {path: 'video/:id', component: VideoViewComponent},
  {path: 'search', component: SearchResultComponent},
  {path: '**', redirectTo: 'search', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
