import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrLoginComponent } from './dr-login.component';

describe('DrLoginComponent', () => {
  let component: DrLoginComponent;
  let fixture: ComponentFixture<DrLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
