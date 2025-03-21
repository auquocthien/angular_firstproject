import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlightCompleteTodo]',
})
export class HighlighCompleteTodoDirective implements OnChanges {
  @Input('appHighlightCompleteTodo') isCompleted: boolean = true;

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

  @HostListener('click') onClick(): void {
    console.log('elemnet click');
  }

  public fnCallFromEnternal() {
    console.log('function inside directive called');
  }
}
