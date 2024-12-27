import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Image } from './model/image.model';
import { ImageService } from './service/image.service';
import { JsonPipe, NgFor } from '@angular/common';
import { ImageItemComponent } from './components/image-item/image-item.component';

@Component({
  selector: 'app-images',
  imports: [NgFor, ImageItemComponent],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss',
})
export class ImagesComponent implements OnInit, AfterViewInit {
  images: Image[];

  @ViewChildren('imageItem') imageItem: QueryList<ImageItemComponent>;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService.getImages().subscribe((images) => {
      this.images = images;
    });
  }
  ngAfterViewInit(): void {
    this.showImageItemRef();
  }

  showImageItemRef() {
    if (this.imageItem) {
      this.imageItem.forEach((item) => {
        console.log(item.image);
      });
    }
  }
}
