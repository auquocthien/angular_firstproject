import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlightSubtext]',
})
export class HighlightSubtextDirective implements AfterViewInit {
  @Input() subtext = '';
  paragraph = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    this.highlight();
  }

  private highlight() {
    this.paragraph = this.el.nativeElement.textContent.trim();
    if (!this.subtext || !this.paragraph.includes(this.subtext)) {
      return;
    }
    const [forward, backward] = this.paragraph.split(this.subtext);

    const spanTag = this.renderer.createElement('span');
    const spanText = this.renderer.createText(this.subtext);
    this.renderer.appendChild(spanTag, spanText);
    this.renderer.setStyle(spanTag, 'background-color', 'yellow');

    const newContent = `${forward} ${spanTag.outerHTML} ${backward}`;

    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', newContent);
  }
}
