import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelViewComponent } from './channel-view.component';
import { NumberPrecisionPipe } from '../../common/pipes/number-precision.pipe';
import { PlaylistCardComponent } from '../../result-list/playlist-card/playlist-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LoggerService } from '../../services/logger.service';
import { ChannelService } from '../../services/channel.service';
import { HttpService } from '../../services/http.service';
import { HttpModule } from '@angular/http';
import { Config } from '../../app.config';
import { DataService } from '../../services/data.service';
// describe('ChannelViewComponent', () => {
//   let component: ChannelViewComponent;
//   let fixture: ComponentFixture<ChannelViewComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     imports: [
  //       HttpModule,
  //       RouterTestingModule],
  //     declarations: [
  //       ChannelViewComponent,
  //       NumberPrecisionPipe,
  //       PlaylistCardComponent
  //      ],
  //      providers: [
  //       LoggerService,
  //       ChannelService,
  //       HttpService,
  //       Config,
  //       DataService
  //      ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ChannelViewComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
// });
