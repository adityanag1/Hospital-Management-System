import { TestBed } from '@angular/core/testing';

import { DoctorloginService } from './doctorlogin.service';

describe('DoctorloginService', () => {
  let service: DoctorloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
