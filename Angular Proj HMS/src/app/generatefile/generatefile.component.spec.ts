import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratefileComponent } from './generatefile.component';

describe('GeneratefileComponent', () => {
  let component: GeneratefileComponent;
  let fixture: ComponentFixture<GeneratefileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratefileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratefileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
