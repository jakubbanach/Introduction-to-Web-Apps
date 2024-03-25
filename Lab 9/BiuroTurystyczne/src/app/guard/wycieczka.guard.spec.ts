import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { wycieczkaGuard } from './wycieczka.guard';

describe('wycieczkaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => wycieczkaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
