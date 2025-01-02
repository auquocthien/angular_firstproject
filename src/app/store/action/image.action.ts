import { createAction, props } from '@ngrx/store';
import { Image } from '../../components/images/model/image.model';

export const loadImage = createAction(
  '[Image] load image',
  props<{ loaded?: boolean }>()
);

export const loadImageSuccessful = createAction(
  '[Image] load image successful',
  props<{ images: Image[] }>()
);

export const loadImageFailure = createAction('[Image] load image failure');

export const getImageDetail = createAction(
  '[Image] get image detail ',
  props<{ id: string }>()
);
