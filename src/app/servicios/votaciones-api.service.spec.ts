import { TestBed } from '@angular/core/testing';

import { VotacionesApiService } from './votaciones-api.service';

describe('VotacionesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VotacionesApiService = TestBed.get(VotacionesApiService);
    expect(service).toBeTruthy();
  });
});
