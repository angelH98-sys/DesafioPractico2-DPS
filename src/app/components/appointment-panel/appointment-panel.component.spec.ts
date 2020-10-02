import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPanelComponent } from './appointment-panel.component';

describe('AppointmentPanelComponent', () => {
  let component: AppointmentPanelComponent;
  let fixture: ComponentFixture<AppointmentPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
