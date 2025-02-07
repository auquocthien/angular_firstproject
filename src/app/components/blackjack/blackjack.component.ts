import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Player, PlayerScorePerRound } from './model/player.model';
import { NgFor } from '@angular/common';
import { RowComponent } from './component/row/row.component';
import { BlackJackService } from './service/blackjack.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blackjack',
  imports: [NgFor, RowComponent, FormsModule],
  templateUrl: './blackjack.component.html',
  styleUrl: './blackjack.component.scss',
})
export class BlackJackComponent implements OnInit, AfterViewInit {
  players: Player[] = [];
  newPlayerName: string;
  bet: number = 1;
  roundCount: number = 0;
  round: PlayerScorePerRound[] = [];
  playerWillScroll: string;

  @ViewChildren('playerRow') playerRowRef: QueryList<RowComponent>;

  constructor(private blackjackService: BlackJackService) {}

  ngOnInit(): void {
    this.blackjackService.player$.subscribe((players) => {
      this.players = players;
    });
  }

  ngAfterViewInit(): void {
    console.log('view init');
  }

  addPlayer() {
    this.blackjackService.addPlayer(this.newPlayerName, this.roundCount);
    this.newPlayerName = '';
  }

  setBet() {
    this.blackjackService.setBet = this.bet;
  }

  updateRoundScore(playerScore: PlayerScorePerRound) {
    if (!playerScore.isDealer) {
      this.updatePlayerScore(playerScore);
    }
    this.updateDealerScore(playerScore);

    if (
      this.round.length == this.blackjackService.getPlayerCount &&
      this.playerRowRef.find((ref) => ref.player.isDealer).playerScore
    ) {
      setTimeout(() => {
        this.round.forEach((player) => {
          this.blackjackService.updatePlayerScore(player);
        });
        this.reset();
      }, 300);

      this.roundCount += 1;
    }
  }

  updatePlayerScore(playerScore: PlayerScorePerRound) {
    if (this.round.length == 0) {
      this.round.push(playerScore);
    }
    const exitsScore = this.round.findIndex(
      (s) => s.playerName == playerScore.playerName
    );
    if (exitsScore == -1) {
      this.round.push(playerScore);
    } else {
      this.round[exitsScore].score = playerScore.score;
    }
  }

  updateDealerScore(playerScore: PlayerScorePerRound) {
    const dealer = this.playerRowRef.find((player) => player.player.isDealer);
    const dealerScore = !playerScore.isDealer
      ? 0 -
        this.round
          .filter((player) => !player.isDealer)
          .reduce((score, playerScore) => {
            return (score += playerScore.score);
          }, 0)
      : playerScore.score;

    dealer.playerScore = dealerScore;

    if (playerScore.isDealer) {
      this.playerRowRef.forEach((ref) => {
        if (!ref.player.isDealer) {
          const playerNotDealerScore =
            0 - playerScore.score / (this.blackjackService.getPlayerCount - 1);
          ref.playerScore = playerNotDealerScore;

          this.updatePlayerScore({
            playerName: ref.player.name,
            score: playerNotDealerScore,
            isDealer: false,
          });
        }
      });
    }

    this.updatePlayerScore({
      playerName: dealer.player.name,
      score: dealerScore,
      isDealer: true,
    });
  }

  reset() {
    this.round = [];
    this.playerRowRef.forEach((ref) => {
      ref.playerScore = undefined;
    });
  }

  setPlayerWillScroll(name: string) {
    this.playerWillScroll = name;
  }

  sysScroll(event: { offset: number; name: string }) {
    if (event.name !== this.playerWillScroll) return;
    this.playerRowRef
      .filter((ref) => {
        return ref.player.name !== event.name;
      })
      .forEach((ref) => {
        ref.isDuringUpdateScore = true;
        ref.scoreBarRef.scrollTo({ left: event.offset });

        setTimeout(() => {
          ref.isDuringUpdateScore = false;
        }, 100);
      });
  }
}
