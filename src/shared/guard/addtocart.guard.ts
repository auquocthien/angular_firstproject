import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AppStore from '../../app/store/reducer';
import { map } from 'rxjs';
import { UserRole } from '../models/user.model';

export const addtocartGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(AppStore.selectUser).pipe(
    map((user) => {
      if (!user) {
        router.navigate(['user']);
        return false;
      }
      return true;
    })
  );
};
