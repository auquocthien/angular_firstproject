import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Player, PlayerScorePerRound, Result } from '../../model/player.model';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { NgScrollbar, NgScrollbarModule } from 'ngx-scrollbar';
import { BlackJackService } from '../../service/blackjack.service';

@Component({
  selector: 'app-row',
  imports: [FontAwesomeModule, NgClass, NgFor, NgScrollbarModule, NgIf],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss',
})
export class RowComponent implements AfterViewInit, OnInit {
  rowIcon = {
    icon: faSync,
  };
  playerScore: number;
  result = Result;
  isShowAction: boolean = false;
  isDuringUpdateScore: boolean;
  finalScore: number;

  @Input() player: Player;

  @Output() sendScore = new EventEmitter<PlayerScorePerRound>();
  @Output() sendOffset = new EventEmitter<{
    offset: number;
    name: string;
  }>();
  @Output() sendPlayerWillScroll = new EventEmitter<string>();
  @ViewChild('scorebarRef') scoreBarRef: NgScrollbar;
  @ViewChildren('playerScore') playerScoreRef: QueryList<ElementRef>;

  constructor(private blackjackService: BlackJackService) {
    this.isDuringUpdateScore = false;
  }

  ngOnInit(): void {
    this.finalScore = this.player.score.reduce(
      (score, current) => score + current,
      0
    );

    console.log('component rerender');
  }
  ngAfterViewInit(): void {
    this.isDuringUpdateScore = true;
    const lastScoreElement = this.playerScoreRef.last;
    this.scoreBarRef.scrollToElement(lastScoreElement, { duration: 300 });
    setTimeout(() => {
      this.isDuringUpdateScore = false;
    }, 300);
  }

  switchDealer() {
    this.blackjackService.switchDealer(this.player.name);
  }

  updatePlayerScore(result: Result) {
    if (this.player.isDealer) {
      this.playerScore =
        this.blackjackService.mapResultToScore(result) *
        (this.blackjackService.getPlayerCount - 1);
    } else {
      this.playerScore = this.blackjackService.mapResultToScore(result);
    }

    this.sendScore.emit({
      playerName: this.player.name,
      score: this.playerScore,
      isDealer: this.player.isDealer,
    });
  }

  showAction() {
    this.isShowAction = !this.isShowAction;
  }

  onScroll(event: any) {
    if (this.isDuringUpdateScore) return;

    const scrollElement = this.scoreBarRef.nativeElement as HTMLElement;
    this.sendOffset.emit({
      offset: scrollElement.scrollLeft,
      name: this.player.name,
    });
  }

  onMouseEnter() {
    this.sendPlayerWillScroll.emit(this.player.name);
  }
}
