import { TestBed } from '@angular/core/testing';

import { ElectionsApiService } from './elections-api.service';

describe('ElectionsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElectionsApiService = TestBed.get(ElectionsApiService);
    expect(service).toBeTruthy();
  });
});
