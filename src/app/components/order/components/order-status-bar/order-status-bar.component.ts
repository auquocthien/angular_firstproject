import { Component } from '@angular/core';

@Component({
  selector: 'app-order-status-bar',
  imports: [],
  templateUrl: './order-status-bar.component.html',
  styleUrl: './order-status-bar.component.scss',
})
export class OrderStatusBarComponent {
  currentStatusDotStyle() {
    return {
      'bg-primary': true,
    };
  }
}
