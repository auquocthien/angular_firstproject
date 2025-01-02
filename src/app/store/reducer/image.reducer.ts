import { createReducer, createSelector, on } from '@ngrx/store';
import { Image } from '../../components/images/model/image.model';
import * as ImageAction from '../action/image.action';
export interface State {
  images: Image[];
  loaded: boolean;
}

export const initialImageState = {
  images: [],
  loaded: false,
};

export const imageReducer = createReducer(
  initialImageState,
  on(ImageAction.loadImageSuccessful, (state, { images }) => ({
    ...state,
    images: [...state.images, ...images],
    loaded: true,
  })),

  on(ImageAction.loadImageFailure, (state, {}) => ({
    ...state,
    loaded: false,
  }))
);

export const selectImage = (state: State) => state.images;
export const selectLoaded = (state: State) => state.loaded;
export const selectImageDetail = (id: string) =>
  createSelector(selectImage, (images) => {
    return images.filter((image) => image.id == id);
  });
