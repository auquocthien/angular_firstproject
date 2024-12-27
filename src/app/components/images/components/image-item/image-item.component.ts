import { Component, Input } from '@angular/core';
import { Image } from '../../model/image.model';

@Component({
  selector: 'app-image-item',
  imports: [],
  templateUrl: './image-item.component.html',
  styleUrl: './image-item.component.scss',
})
export class ImageItemComponent {
  @Input() image: Image;
}
