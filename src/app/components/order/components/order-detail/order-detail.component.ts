import { Component, OnInit } from '@angular/core';
import { OrderStatusBarComponent } from '../order-status-bar/order-status-bar.component';
import { Observable } from 'rxjs';
import { OrderDetail } from '../../model/order.model';
import { OrderService } from '../../services/order.service';
import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';
import { Image } from '../../../images/model/image.model';
import { ImageService } from '../../../images/service/image.service';

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

  constructor(
    private orderService: OrderService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.orderService.sampleOrder.subscribe((order) => {
      this.order = order;

      this.totalAmount = order.items.reduce(
        (total, current) => (total += current.price * current.quantity),
        0
      );
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
}
