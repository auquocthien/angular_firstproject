import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Image } from './model/image.model';
import { NgFor } from '@angular/common';
import { ImageItemComponent } from './components/image-item/image-item.component';
import { Store } from '@ngrx/store';
import * as AppStore from '../../store/reducer';
import { switchMap, take, tap } from 'rxjs';
import * as ImageAction from '../../store/action/image.action';

@Component({
  selector: 'app-images',
  imports: [NgFor, ImageItemComponent],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss',
})
export class ImagesComponent implements OnInit, AfterViewInit {
  images: Image[];

  @ViewChildren('imageItem') imageItem: QueryList<ImageItemComponent>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // this.imageService.getImages().subscribe((images) => {
    //   this.images = images;
    // });
    this.loadImage();
  }
  ngAfterViewInit(): void {
    // this.showImageItemRef();
  }

  loadImage() {
    this.store
      .select(AppStore.selectImageLoaded)
      .pipe(
        take(1),
        tap((loaded) => {
          this.store.dispatch(ImageAction.loadImage({ loaded }));
        }),
        switchMap(() => this.store.select(AppStore.selectImage))
      )
      .subscribe((images) => {
        this.images = images;
      });
  }

  showImageItemRef() {
    if (this.imageItem) {
      this.imageItem.forEach((item) => {
        console.log(item.image);
      });
    }
  }
}
