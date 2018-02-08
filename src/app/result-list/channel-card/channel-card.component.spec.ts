import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelCardComponent } from './channel-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NumberPrecisionPipe } from '../../common/pipes/number-precision.pipe';
import { ChannelService } from '../../services/channel.service';
import { HttpService } from '../../services/http.service';
import { LoggerService } from '../../services/logger.service';
import { Config } from '../../app.config';

describe('ChannelCardComponent', () => {
  let component: ChannelCardComponent;
  let fixture: ComponentFixture<ChannelCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        RouterTestingModule
      ],
      declarations: [
        ChannelCardComponent,
        NumberPrecisionPipe
      ],
      providers: [
        ChannelService,
        HttpService,
        LoggerService,
        Config
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
