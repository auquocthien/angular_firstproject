import { Component, OnInit } from '@angular/core';
import { OrderStatusBarComponent } from '../order-status-bar/order-status-bar.component';
import { Observable } from 'rxjs';
import { OrderDetail } from '../../model/order.model';
import { OrderService } from '../../services/order.service';
import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';
import { Image } from '../../../images/model/image.model';
import { ImageService } from '../../../images/service/image.service';
import { IUser } from '../../../../../shared/models/user.model';
import { Store } from '@ngrx/store';
import * as AppStore from '../../../../store/reducer';

@Component({
  selector: 'app-order-detail',
  imports: [OrderStatusBarComponent, DatePipe, NgFor, CurrencyPipe],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent implements OnInit {
  order: OrderDetail;
  imageDetailMap: { [key: string]: Image } = {};
  totalAmount: number;
  userProfile: IUser;

  constructor(
    private orderService: OrderService,
    private imageService: ImageService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.orderService.sampleOrder.subscribe((order) => {
      this.order = order;

      this.totalAmount = order.items.reduce(
        (total, current) => (total += current.price * current.quantity),
        0
      );
    });

    this.store.select(AppStore.selectUser).subscribe((profile) => {
      this.userProfile = profile;
    });

    this.getImageDetail();
  }

  getImageDetail() {
    this.order.items.forEach((item) => {
      this.imageService.getImageDetail(item.id).subscribe((d) => {
        this.imageDetailMap[item.id] = d;
      });
    });
  }

  getUserInfo(): string {
    const { phone, address } = this.userProfile.profile;
    return `${phone}, ${address[0].street}, ${address[0].suite}, ${address[0].city}`;
  }
}
