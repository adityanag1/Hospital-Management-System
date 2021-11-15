import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrdashboardComponent } from './drdashboard.component';

describe('DrdashboardComponent', () => {
  let component: DrdashboardComponent;
  let fixture: ComponentFixture<DrdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
