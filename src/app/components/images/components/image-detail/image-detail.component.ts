import { Component, OnInit } from '@angular/core';
import { Image } from '../../model/image.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../../service/image.service';
import { CurrencyPipe } from '@angular/common';
import { HoverButtonDirective } from '../../../../../shared/directives/hover-button.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHeart,
  faUpload,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as AppStore from '../../../../store/reducer/';

@Component({
  selector: 'app-image-detail',
  imports: [CurrencyPipe, HoverButtonDirective, FontAwesomeModule],
  templateUrl: './image-detail.component.html',
  styleUrl: './image-detail.component.scss',
})
export class ImageDetailComponent implements OnInit {
  selectedImage: Image;
  faIcon = { heart: faHeart, upload: faUpload, ellipsish: faEllipsisH };

  constructor(private activeRoute: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const imageId = data['id'];
      this.store
        .select(AppStore.selectImageDetail(imageId))
        .subscribe((images) => {
          this.selectedImage = images[0];
        });
    });
    console.log(this.selectedImage);
  }
}
