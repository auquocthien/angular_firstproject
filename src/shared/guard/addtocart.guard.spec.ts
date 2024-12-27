import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { addtocartGuard } from './addtocart.guard';

describe('addtocartGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => addtocartGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
