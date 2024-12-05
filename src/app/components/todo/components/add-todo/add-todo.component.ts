import {
  Component,
  EventEmitter,
  output,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss',
})
export class AddTodoComponent {
  searchText = '';
  addTodoItem = output<string>();

  handleAddTodo() {
    if (this.searchText == '') {
      alert('todo cannot empty');
      return;
    }
    console.log(this.searchText);
    this.addTodoItem.emit(this.searchText);
    this.searchText = '';
  }
}
