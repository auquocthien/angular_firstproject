import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Todo } from './models/todo.model';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { HightlightCompleteTodoDirective } from './directives/hightlight-complete-todo.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { FirstLetterUppercasePipe } from '../../../shared/pipes/first-letter-uppercase.pipe';
import { NgIf, NgStyle } from '@angular/common';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';

@Component({
  selector: 'app-todo',
  imports: [
    FormsModule,
    NgStyle,
    HightlightCompleteTodoDirective,
    FirstLetterUppercasePipe,
    AddTodoComponent,
    EditTodoComponent,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  editText = '';
  completeCount = 0;
  editAt = 0;

  @Input() userId: string = '';

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      if (param.get('id') != null) {
        this.userId = param.get('id')!;
      }
    });
    this.loadTodos();
    this.updateCompleteCount();
    // this.todoService
    //   .getTodos()
    //   .pipe(
    //     catchError((error) => {
    //       console.error(error);
    //       throw error;
    //     })
    //   )
    //   .subscribe((res) => {
    //     if (res) {
    //       const userIdNum = parseInt(this.userId, 10);
    //       this.todos = res.filter((todo) => todo.userId === userIdNum);
    //       console.log(this.todos);
    //       this.filteredTodos = [...this.todos];
    //     }
    //   });
  }

  updateCompleteCount() {
    this.completeCount = this.filteredTodos.filter(
      (todo) => todo.completed == true
    ).length;
  }

  private loadTodos(): void {
    this.todos = this.todoService.getTodos();
    this.filterTodoByUserId(this.userId);
  }

  filterTodoByStatus(event: Event): void {
    const option = (event.target as HTMLInputElement).value;
    if (option === 'all') {
      this.todos = [...this.filteredTodos];
    } else {
      const isCompleted = option === 'true';
      this.todos = this.filteredTodos.filter(
        (todo) => todo.completed === isCompleted
      );
    }
  }

  filterTodoByUserId(userId: string) {
    const userIdNum = parseInt(userId, 10);
    this.todos = this.todos.filter((todo) => todo.userId === userIdNum);
    this.filteredTodos = [...this.todos];
  }

  addItem(todoItem: string): void {
    const newTodo: Todo = {
      userId: parseInt(this.userId),
      id: this.todos.length + 1,
      title: todoItem,
      completed: false,
    };
    this.todos.push(newTodo);
    this.filteredTodos.push(newTodo);
  }

  deleteTodo(todoId: number): void {
    const index = this.todos.findIndex((todo) => todo.id == todoId);

    if (index != -1) {
      this.todos = this.todos.filter((todo) => todo.id != todoId);
      this.filteredTodos = this.filteredTodos.filter(
        (todo) => todo.id != todoId
      );
    }
    console.log(todoId);
    this.updateCompleteCount();
  }

  editTodo(todoId: number): void {
    if (todoId == this.editAt) {
      this.editAt = 0;

      this.todos.map((todo) => {
        if (todo.id == todoId) {
          todo.title = this.editText == '' ? todo.title : this.editText;
        }
      });
      this.filteredTodos = [...this.todos];
      this.editText = '';
      console.log(this.editText);
    } else {
      this.editAt = todoId;
      console.log(this.editText);
    }
  }

  isEdit(todoId: number): boolean {
    return todoId == this.editAt;
  }

  handleEdit(todo: string): void {
    this.editText = todo;
  }

  toggleTodoCompletion(todoId: number): void {
    this.todos = this.todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    this.filteredTodos = this.filteredTodos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );

    this.updateCompleteCount();
  }
}

// <app-add-todo (addTodoItem)="addItem($event)"></app-add-todo>
// <div
//   class="col-6 mx-auto d-flex justify-content-center align-items-center gap-3 mt-3"
// >
//   <div class="text-center">
//     <input
//       type="radio"
//       name="filter-todo"
//       (change)="filterTodoByStatus($event)"
//       checked
//       value="all"
//       id="all"
//     />
//     <label for="all" class="ms-1">All</label>
//   </div>
//   <div class="text-center">
//     <input
//       type="radio"
//       name="filter-todo"
//       (change)="filterTodoByStatus($event)"
//       value="true"
//       id="completed"
//     />
//     <label for="completed" class="ms-1">Completed ({{ completeCount }})</label>
//   </div>
//   <div class="text-center">
//     <input
//       type="radio"
//       name="filter-todo"
//       (change)="filterTodoByStatus($event)"
//       value="false"
//       id="uncompleted"
//     />
//     <label for="uncompleted" class="ms-1">
//       Uncompleted ({{ filteredTodos.length - completeCount }})
//     </label>
//   </div>
// </div>

// @defer{
// <table class="table w-75 mx-auto mt-4 align-middle">
//   <thead>
//     <tr class="text-center table-primary">
//       <th>No.</th>
//       <th>Mask as Done</th>
//       <th>Description</th>
//       <th>Edit todo</th>
//       <th>Delete todo</th>
//     </tr>
//   </thead>
//   <tbody class="fs-6">
//     @for (todo of todos; track todo.id; let ind = $index) {
//     <tr>
//       <td class="text-center">
//         {{ ind + 1 }}
//       </td>
//       <td class="text-center">
//         <input
//           type="checkbox"
//           [checked]="todo.completed"
//           id="todo_{{ todo.id }}"
//           (click)="toggleTodoCompletion(todo.id)"
//         />
//       </td>
//       @if (!isEdit(todo.id)) {
//       <td class="align-center" [appHightlightCompleteTodo]="todo.completed">
//         {{ todo.title | firstLetterUppercase }}
//       </td>
//       } @else {
//       <td>
//         <app-edit-todo
//           [title]="todo.title"
//           (sendValue)="(editText)"
//         ></app-edit-todo>
//       </td>
//       }
//       <td class="text-center">
//         @if (!todo.completed) {
//         <button class="btn btn-info text-white" (click)="editTodo(todo.id)">
//           {{ !isEdit(todo.id) ? "edit" : "save" }}
//         </button>
//         }
//       </td>
//       <td class="text-center">
//         <button
//           class="btn btn-danger text-white"
//           [ngStyle]="{ 'text-decoration': 'none' }"
//           (click)="deleteTodo(todo.id)"
//         >
//           delete
//         </button>
//       </td>
//     </tr>

//     }
//   </tbody>
// </table>
// } @placeholder {
// <p>loading</p>
// } @loading {
// <p>loading.......</p>
// }
