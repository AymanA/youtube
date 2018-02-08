import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCardComponent } from './video-card.component';
import { MomentModule } from 'angular2-moment';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NumberPrecisionPipe } from '../../common/pipes/number-precision.pipe';
import { VideoService } from '../../services/video.service';
import { LoggerService } from '../../services/logger.service';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';
import { Config } from '../../app.config';

describe('VideoCardComponent', () => {
  let component: VideoCardComponent;
  let fixture: ComponentFixture<VideoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        RouterTestingModule,
        MomentModule
      ],
      declarations: [
        VideoCardComponent,
        NumberPrecisionPipe
       ],
       providers: [
         VideoService,
         LoggerService,
         DataService,
         HttpService,
         Config
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
