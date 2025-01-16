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
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../cart/services/cart.service';
import { CartItem } from '../../../cart/model/cart.model';
import { Observable } from 'rxjs';
import {
  IUser,
  IUserProfile,
  UserRole,
} from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-image-detail',
  imports: [CurrencyPipe, HoverButtonDirective, FontAwesomeModule, FormsModule],
  templateUrl: './image-detail.component.html',
  styleUrl: './image-detail.component.scss',
})
export class ImageDetailComponent implements OnInit {
  selectedImage: Image;
  user: IUser;
  quantity = 1;
  faIcon = { heart: faHeart, upload: faUpload, ellipsish: faEllipsisH };

  constructor(
    private activeRoute: ActivatedRoute,
    private store: Store,
    private imageService: ImageService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const imageId = data['id'];
      // this.store
      //   .select(AppStore.selectImageDetail(imageId))
      //   .subscribe((images) => {
      //     this.selectedImage = images[0];
      //   });
      this.imageService
        .getImageDetail(imageId)
        .subscribe((image) => (this.selectedImage = image));
    });

    this.store.select(AppStore.selectUser).subscribe((user) => {
      this.user = user;
    });
  }

  increaseQuantity() {
    if (this.quantity + 1 <= this.selectedImage.quantity) {
      this.quantity += 1;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  addImageToCart() {
    const cartItem: CartItem = {
      id: this.selectedImage.id,
      imageUrl: this.selectedImage.download_url,
      price: this.selectedImage.price,
      quantity: this.quantity,
      createAt: new Date(),
    };
    this.cartService.addItem(cartItem);
    console.log(this.cartService.cartItem);
  }

  isDisableButton() {
    return (
      this.user == undefined || this.user.account.role !== UserRole.Customer
    );
  }

  onBuyButtonClicked() {
    if (this.isDisableButton) {
      this.router.navigate(['']);
    }
  }
}
