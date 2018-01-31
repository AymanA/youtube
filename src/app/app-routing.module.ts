import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ChannelViewComponent } from './channel/channel-view/channel-view.component';
import { SearchResultComponent } from './search-result/search-result.component';

const appRoutes: Routes = [
  {path: 'channel/:id', component: ChannelViewComponent},
  // {path: 'main', component: AppComponent},
  {path: 'search', component: SearchResultComponent},
  {path: '**', redirectTo: 'search', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
