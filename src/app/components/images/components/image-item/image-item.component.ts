import { Component, Input } from '@angular/core';
import { Image } from '../../model/image.model';
import { HighlightImageDirective } from '../../../../../shared/directives/highlight-image.directive';
import { HoverButtonDirective } from '../../../../../shared/directives/hover-button.directive';
import { Router } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { CartItem } from '../../../cart/model/cart.model';

@Component({
  selector: 'app-image-item',
  imports: [HoverButtonDirective],
  templateUrl: './image-item.component.html',
  styleUrl: './image-item.component.scss',
})
export class ImageItemComponent {
  @Input() image: Image;

  constructor(private router: Router, private cartService: CartService) {}

  onButtonClick() {
    this.router.navigate(['images/image', this.image.id]);
  }

  addItemToCart(event: Event) {
    event.stopPropagation();
    const item: CartItem = {
      id: this.image.id,
      price: this.image.price,
      quantity: 1,
    };

    this.cartService.addItem(item);
  }
}
