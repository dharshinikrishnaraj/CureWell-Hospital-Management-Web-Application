import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTodaysSurgeryComponent } from './view-todays-surgery.component';

describe('ViewTodaysSurgeryComponent', () => {
  let component: ViewTodaysSurgeryComponent;
  let fixture: ComponentFixture<ViewTodaysSurgeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTodaysSurgeryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTodaysSurgeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
