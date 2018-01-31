import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ChannelViewComponent } from './channel/channel-view/channel-view.component';

const appRoutes: Routes = [
  {path: 'channel/:id', component: ChannelViewComponent},
  {path: 'main/', component: AppComponent},
  {path: '**', redirectTo: 'main', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
