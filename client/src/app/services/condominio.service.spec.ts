import { TestBed, inject } from '@angular/core/testing';

import { CondominioService } from './condominio.service';

describe('CondominioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CondominioService]
    });
  });

  it('should be created', inject([CondominioService], (service: CondominioService) => {
    expect(service).toBeTruthy();
  }));
});
