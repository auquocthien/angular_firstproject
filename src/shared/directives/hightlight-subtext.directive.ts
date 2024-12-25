import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHightlightSubtext]',
})
export class HightlightSubtextDirective implements AfterViewInit {
  @Input() subtext = '';
  pharagraph = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    this.hightlight();
  }

  private hightlight() {
    this.pharagraph = this.el.nativeElement.textContent.trim();
    if (!this.subtext || !this.pharagraph.includes(this.subtext)) {
      return;
    }
    const [forward, backward] = this.pharagraph.split(this.subtext);

    const spanTag = this.renderer.createElement('span');
    const spanText = this.renderer.createText(this.subtext);
    this.renderer.appendChild(spanTag, spanText);
    this.renderer.setStyle(spanTag, 'background-color', 'yellow');

    const newContent = `${forward} ${spanTag.outerHTML} ${backward}`;

    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', newContent);
  }
}
