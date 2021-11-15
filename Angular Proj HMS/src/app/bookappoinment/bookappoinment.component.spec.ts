import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookappoinmentComponent } from './bookappoinment.component';

describe('BookappoinmentComponent', () => {
  let component: BookappoinmentComponent;
  let fixture: ComponentFixture<BookappoinmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookappoinmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookappoinmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
