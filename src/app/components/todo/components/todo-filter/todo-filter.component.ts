import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-filter',
  imports: [],
  templateUrl: './todo-filter.component.html',
  styleUrl: './todo-filter.component.scss',
})
export class TodoFilterComponent {
  @Input() totalTodo = 0;
  @Input() completeCount = 0;
  @Input() uncompletedCount = 0;

  @Output() selectedFilter = new EventEmitter<string>();

  onFilterChange(event: Event) {
    const option = (event.target as HTMLInputElement).value;
    this.selectedFilter.emit(option);
  }
}
