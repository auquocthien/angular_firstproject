import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  imports: [NgClass, NgStyle],
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent {
  @Input() classes: string[] = [];
  @Input() styles: { [key: string]: string } = {};
}
