import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../model/image.model';
import { HighlightImageDirective } from '../../../../../shared/directives/highlight-image.directive';
import { HoverButtonDirective } from '../../../../../shared/directives/hover-button.directive';
import { Router } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { CartItem } from '../../../cart/model/cart.model';
import { ToasterService } from '../../../../../shared/services/toaster.service';
import { AuthService } from '../../../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { merge } from 'rxjs';

@Component({
  selector: 'app-image-item',
  imports: [HoverButtonDirective],
  templateUrl: './image-item.component.html',
  styleUrl: './image-item.component.scss',
})
export class ImageItemComponent implements OnInit {
  @Input() image: Image;
  disableAddToCart: boolean;

  constructor(
    private router: Router,
    private cartService: CartService,
    private toaster: ToasterService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.disableAddToCart = this.authService.isAuth;
  }

  onImageClick() {
    this.router.navigate(['images/image', this.image.id]);
  }

  addItemToCart(event: Event) {
    event.stopPropagation();

    const item: CartItem = {
      id: this.image.id,
      imageUrl: this.image.download_url,
      price: this.image.price,
      quantity: 1,
      createAt: new Date(),
    };

    this.toaster.success('add item to cart success');
    this.router.navigate([], {
      queryParams: { addToCart: this.image.id },
      queryParamsHandling: 'merge',
    });
    this.cartService.addItem(item);
  }
}
