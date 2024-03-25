import { TestBed } from '@angular/core/testing';

import { ListaWycieczekService } from './lista-wycieczek.service';

describe('ListaWycieczekService', () => {
  let service: ListaWycieczekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaWycieczekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
