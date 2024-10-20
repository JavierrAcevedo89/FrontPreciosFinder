import { TestBed } from '@angular/core/testing';

import { AliexpressService } from './ali-express.service';

describe('AliExpressService', () => {
  let service: AliexpressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AliexpressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
