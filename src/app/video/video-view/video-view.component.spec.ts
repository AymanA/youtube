import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoViewComponent } from './video-view.component';
import { NumberPrecisionPipe } from '../../common/pipes/number-precision.pipe';
import { MomentModule } from 'angular2-moment';
import { VideoCardComponent } from '../../result-list/video-card/video-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LoggerService } from '../../services/logger.service';
import { VideoService } from '../../services/video.service';
import { HttpModule } from '@angular/http';
import { HttpService } from '../../services/http.service';
import { Config } from '../../app.config';

describe('VideoViewComponent', () => {
  let component: VideoViewComponent;
  let fixture: ComponentFixture<VideoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MomentModule,
        HttpModule,
        RouterTestingModule,
      ],
      declarations: [
        VideoViewComponent,
        NumberPrecisionPipe,
        VideoCardComponent
       ],
       providers: [
        LoggerService,
        VideoService,
        HttpService,
        Config
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
