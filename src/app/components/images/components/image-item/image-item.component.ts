import { Component, Input } from '@angular/core';
import { Image } from '../../model/image.model';
import { HighlightImageDirective } from '../../../../../shared/directives/highlight-image.directive';
import { HoverButtonDirective } from '../../../../../shared/directives/hover-button.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-item',
  imports: [HoverButtonDirective],
  templateUrl: './image-item.component.html',
  styleUrl: './image-item.component.scss',
})
export class ImageItemComponent {
  @Input() image: Image;

  constructor(private router: Router) {}

  onButtonClick() {
    this.router.navigate(['images/image', this.image.id]);
  }
}
