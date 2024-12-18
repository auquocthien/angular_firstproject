import { DecimalPipe, NgClass, NgStyle, PercentPipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [NgStyle, DecimalPipe, NgClass, PercentPipe],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent implements OnChanges {
  @Input() completed: number = 0;
  @Input() todoAmount: number = 0;

  belowAvg: string = '';

  ngOnChanges(): void {
    this.belowAvg =
      (this.completed / this.todoAmount) * 100 < 50 ? 'bg-danger' : 'bg-info';
  }
}
