import { TestBed } from '@angular/core/testing';

import { ExtraValidationService } from './extravalidation.service';

describe('ExtravalidationService', () => {
  let service: ExtraValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
