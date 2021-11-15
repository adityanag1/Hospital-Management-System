import { TestBed } from '@angular/core/testing';

import { RegisterpatientService } from './registerpatient.service';

describe('RegisterpatientService', () => {
  let service: RegisterpatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterpatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
