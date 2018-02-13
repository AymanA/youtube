import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  ResultListComponent
} from './result-list.component';
import { ChannelCardComponent } from './channel-card/channel-card.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { PlaylistCardComponent } from './playlist-card/playlist-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NumberPrecisionPipe } from '../common/pipes/number-precision.pipe';
import { MomentModule } from 'angular2-moment';

describe('ResultListComponent', () => {
  let component: ResultListComponent;
  let fixture: ComponentFixture < ResultListComponent > ;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        MomentModule
      ],
        declarations: [
          ResultListComponent,
        ChannelCardComponent,
        VideoCardComponent,
        PlaylistCardComponent,
        NumberPrecisionPipe
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
