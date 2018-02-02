import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMoreItemsComponent } from './show-more-items.component';

describe('ShowMoreItemsComponent', () => {
  let component: ShowMoreItemsComponent;
  let fixture: ComponentFixture<ShowMoreItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMoreItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMoreItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
