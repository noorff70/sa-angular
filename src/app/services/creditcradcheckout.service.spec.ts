import { TestBed } from '@angular/core/testing';

import { CreditcradcheckoutService } from './creditcradcheckout.service';

describe('CreditcradcheckoutService', () => {
  let service: CreditcradcheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditcradcheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
