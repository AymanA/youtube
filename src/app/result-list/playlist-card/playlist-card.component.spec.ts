import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCardComponent } from './playlist-card.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PlaylistService } from '../../services/playlist.service';
import { LoggerService } from '../../services/logger.service';
import { HttpService } from '../../services/http.service';
import { Config } from '../../app.config';

describe('PlaylistCardComponent', () => {
  let component: PlaylistCardComponent;
  let fixture: ComponentFixture<PlaylistCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        RouterTestingModule
      ],
      declarations: [ PlaylistCardComponent
      ],
      providers: [
        PlaylistService,
        LoggerService,
        HttpService,
        Config
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
