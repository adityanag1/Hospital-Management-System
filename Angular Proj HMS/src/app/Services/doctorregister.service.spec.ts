import { TestBed } from '@angular/core/testing';

import { DoctorregisterService } from './doctorregister.service';

describe('DoctorregisterService', () => {
  let service: DoctorregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
