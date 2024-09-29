import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSurgeryComponent } from './update-surgery.component';

describe('UpdateSurgeryComponent', () => {
  let component: UpdateSurgeryComponent;
  let fixture: ComponentFixture<UpdateSurgeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateSurgeryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSurgeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
