import { TestBed } from '@angular/core/testing';

import { SoIndexService } from './so-index.service';

describe('SoIndexService', () => {
  let service: SoIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
