import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightImage]',
})
export class HighlightImageDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.addClass(this.el.nativeElement, 'scale-up');
  }

  @HostListener('mouseout') onMouseOut() {
    this.renderer.removeClass(this.el.nativeElement, 'scale-up');
  }
}
