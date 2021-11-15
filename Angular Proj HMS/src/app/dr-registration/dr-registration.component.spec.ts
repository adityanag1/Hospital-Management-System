import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrRegistrationComponent } from './dr-registration.component';

describe('DrRegistrationComponent', () => {
  let component: DrRegistrationComponent;
  let fixture: ComponentFixture<DrRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
