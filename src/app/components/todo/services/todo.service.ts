import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { todoUrl } from '../../../../config';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { map } from 'rxjs';
import { IFirebaseResponseBody } from '../../../../shared/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  localId: string;
  idToken: string;
  constructor(
    private httpClient: HttpClient,
    private localService: LocalStorageService
  ) {
    this.localId = localService.getItem('uuid');
    this.idToken = localService.getItem('idToken');
  }

  getTodos() {
    const url = `${todoUrl}/${this.localId}.json`;
    return this.httpClient.get<{ [key: string]: Todo }>(url).pipe(
      map((todos) => {
        var todosList: Todo[] = [];
        for (const key in todos) {
          if (todos.hasOwnProperty(key)) {
            todosList.push({
              ...todos[key],
              id: key,
            });
          }
        }
        return todosList;
      })
    );
  }

  addTodo(todo) {
    const url = `${todoUrl}/${this.localId}.json?auth=${this.idToken}`;

    return this.httpClient.post(url, todo, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  deleteTodo(id: string) {
    const url = `${todoUrl}/${this.localId}/${id}.json?auth=${this.idToken}`;
    return this.httpClient.delete(url);
  }

  updateTodo(id: string, data: { [key: string]: string | boolean }) {
    const url = `${todoUrl}/${this.localId}/${id}.json?auth=${this.idToken}`;
    return this.httpClient.patch(url, data);
  }
}
