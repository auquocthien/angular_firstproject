import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  fromEvent,
  interval,
  mergeMap,
  switchMap,
  concatMap,
  take,
} from 'rxjs';

@Component({
  selector: 'app-rxjs-test',
  templateUrl: './rxjs-test.component.html',
  styleUrls: [],
  imports: [NgFor],
})
export class RxjsTestComponent implements OnInit {
  mergeMapLogs: number[] = [];
  switchMapLogs: number[] = [];
  concatMapLogs: number[] = [];

  ngOnInit(): void {
    // Element để lắng nghe sự kiện click
    const click$ = fromEvent(document, 'click');

    // Observable phát ra 3 giá trị cách nhau 500ms
    const createInterval$ = () => interval(500).pipe(take(3));

    // mergeMap: Chạy song song
    click$.pipe(mergeMap(() => createInterval$())).subscribe((value) => {
      this.mergeMapLogs.push(value);
    });

    // switchMap: Hủy lần trước khi có lần sau
    click$.pipe(switchMap(() => createInterval$())).subscribe((value) => {
      this.switchMapLogs.push(value);
    });

    // concatMap: Chạy tuần tự
    click$.pipe(concatMap(() => createInterval$())).subscribe((value) => {
      this.concatMapLogs.push(value);
    });
  }
}
