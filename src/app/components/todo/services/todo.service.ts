import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoUrl = 'https://jsonplaceholder.typicode.com/todos/';

  constructor(private httpClient: HttpClient) {}

  getTodos() {
    return this.httpClient.get<Todo[]>(this.todoUrl);
  }
}
