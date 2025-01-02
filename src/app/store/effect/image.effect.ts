import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ImageService } from '../../components/images/service/image.service';
import { Store } from '@ngrx/store';
import * as ImageAction from '../action/image.action';
import { catchError, map, mergeMap, of, withLatestFrom } from 'rxjs';
import * as fromImageReducer from '../reducer/image.reducer';

@Injectable()
export class ImageEffect {
  loadImage$ = createEffect(
    (
      actions$ = inject(Actions),
      imageService = inject(ImageService),
      store = inject(Store)
    ) =>
      actions$.pipe(
        ofType(ImageAction.loadImage),
        withLatestFrom(store.select(fromImageReducer.selectImage)),
        mergeMap(([{ loaded }]) => {
          if (loaded) {
            return of({ type: '[Image] image already loaded' });
          }

          return imageService.getImages().pipe(
            map((images) => {
              return ImageAction.loadImageSuccessful({ images });
            }),
            catchError((error) => of(ImageAction.loadImageFailure))
          );
        })
      ),
    { functional: true }
  );
  constructor() {}
}
