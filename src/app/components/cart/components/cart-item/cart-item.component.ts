import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CartItem } from '../../model/cart.model';
import { CurrencyPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import * as AppStore from '../../../../store/reducer';
import { Image } from '../../../images/model/image.model';
import { ImageService } from '../../../images/service/image.service';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe, FontAwesomeModule, NgIf],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent implements OnInit {
  imageDetail: Image;
  isSelected: boolean = false;
  trashIcon = faTrash;

  @Input() item: CartItem;
  itemQuantity: number = 0;
  @Output() emitSelectChange = new EventEmitter<boolean>();

  constructor(
    private store: Store,
    private imageService: ImageService,
    private cartService: CartService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.itemQuantity = this.item.quantity;
    // this.store
    //   .select(AppStore.selectImageDetail(this.item.id))
    //   .subscribe((image) => (this.imageDetail = image[0]));
    this.imageService
      .getImageDetail(this.item.id)
      .subscribe((image) => (this.imageDetail = image));
  }

  onSelectItem() {
    this.isSelected = !this.isSelected;
    this.emitSelectChange.emit(this.isSelected);
  }

  navigateToImage() {
    this.router.navigate(['images/image', this.item.id]);
  }

  changeQuantity(increase: boolean) {
    this.cartService.changeQuantity(this.item.id, increase);
  }
}
