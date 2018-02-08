import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MdProgressBar } from '@angular2-material/progress-bar/progress-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { LoggerService } from '../services/logger.service';
import { HttpModule } from '@angular/http';
import { HttpService } from '../services/http.service';
import { Config } from '../app.config';
import { DataService } from '../services/data.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        RouterTestingModule
      ],
      declarations: [ HeaderComponent, MdProgressBar ],
      providers: [
        HttpService,
        DataService,
        LoggerService,
        Config
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
