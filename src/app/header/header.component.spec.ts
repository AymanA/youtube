import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MdProgressBar } from '@angular2-material/progress-bar/progress-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { LoggerService } from '../services/logger.service';
import { HttpService } from '../services/http.service';
import { Config } from '../app.config';
import { DataService } from '../services/data.service';
import { NgProgressModule, NgProgress } from '@ngx-progressbar/core';
import { ProgressBarService } from '../services/progress-bar.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        NgProgressModule
      ],
      declarations: [ HeaderComponent, MdProgressBar ],
      providers: [
        HttpService,
        DataService,
        LoggerService,
        Config,
        NgProgress,
        ProgressBarService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
