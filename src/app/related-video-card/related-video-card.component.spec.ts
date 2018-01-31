import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelVideoCardComponent } from './channel-video-card.component';

describe('ChannelVideoCardComponent', () => {
  let component: ChannelVideoCardComponent;
  let fixture: ComponentFixture<ChannelVideoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelVideoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelVideoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
