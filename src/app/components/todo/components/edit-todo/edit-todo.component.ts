import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-todo',
  imports: [FormsModule],
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
})
export class EditTodoComponent {
  @Input() title = '';
  @Output() sendValue = new EventEmitter<string>();

  emitValue(): void {
    this.sendValue.emit(this.title);
  }
}
