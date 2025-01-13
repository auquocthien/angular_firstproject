import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { TodoComponent } from '../todo/todo.component';
import { ProfileCardComponent } from '../../../shared/components/profile/profile-card/profile-card.component';

@Component({
  selector: 'app-home',
  imports: [ProfileCardComponent, NgIf, TodoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnChanges {
  showTodoTable = false;
  selectedUser = 0;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  receive(userId: number) {
    if (this.selectedUser != userId) {
      this.selectedUser = userId;
      this.showTodoTable = true;
    } else {
      this.showTodoTable = false;
      this.selectedUser = -1;
    }
  }
}
