import { TestBed } from '@angular/core/testing';

import { UsuariosApiServiceService } from './usuarios-api-service.service';

describe('UsuariosApiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuariosApiServiceService = TestBed.get(UsuariosApiServiceService);
    expect(service).toBeTruthy();
  });
});
