import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportShiftComponent } from './support-shift.component';

describe('SupportShiftComponent', () => {
  let component: SupportShiftComponent;
  let fixture: ComponentFixture<SupportShiftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportShiftComponent]
    });
    fixture = TestBed.createComponent(SupportShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
