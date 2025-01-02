import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHoverButton]',
})
export class HoverButtonDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostBinding('style.border') btnBorder: string = 'black 1px solid';
  @HostBinding('style.backgroundColor') btnColor: string = 'white';
  @HostBinding('style.color') btnTextColor: string = 'black';
  @HostBinding('style.transition') btnTransition: string = 'all 0.3s ease';

  @HostListener('mouseenter') onMouseEnter() {
    this.btnBorder = 'blue 1px solid';
    this.btnColor = 'blue';
    this.btnTextColor = 'white';
  }

  @HostListener('mouseout') onMouseOut() {
    this.btnBorder = 'black 1px solid';
    this.btnColor = 'white';
    this.btnTextColor = 'black';
  }
}
