import { TestBed } from '@angular/core/testing';

import { GraficaService } from './grafica.service';

describe('GraficaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraficaService = TestBed.get(GraficaService);
    expect(service).toBeTruthy();
  });
});
