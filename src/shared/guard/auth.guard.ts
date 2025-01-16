import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AppStore from '../../app/store/reducer';
import { map } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(AppStore.selectUser).pipe(
    map((user) => {
      if (!user) {
        router.navigate(['']);
        return false;
      }
      return true;
    })
  );
};
