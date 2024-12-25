import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../../app/components/todo/models/todo.model';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
  transform(value: Todo[], filter: string): Todo[] {
    if (filter == 'all') {
      return value;
    } else {
      const isComplete = filter === 'true';
      return value.filter((todo) => todo.completed == isComplete);
    }
  }
}
