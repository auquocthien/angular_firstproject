import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHightlightCompleteTodo]',
})
export class HightlightCompleteTodoDirective implements OnChanges {
  @Input('appHightlightCompleteTodo') isCompleted: boolean = true;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isCompleted']) {
      this.highlight();
    }
  }

  private highlight(): void {
    if (this.isCompleted) {
      this.el.nativeElement.style.textDecoration = 'line-through';
      this.el.nativeElement.style.color = 'gray';
      this.el.nativeElement.style.backgroundColor = 'lightgreen';
    } else {
      this.el.nativeElement.style.textDecoration = 'none';
      this.el.nativeElement.style.color = 'black';
      this.el.nativeElement.style.backgroundColor = 'white';
    }
  }
}
