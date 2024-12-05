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
  inputText = '';
  @Output() sendValue = new EventEmitter<string>();

  emitValue(): void {
    console.log(this.inputText);
    this.sendValue.emit(this.title);
  }
}
