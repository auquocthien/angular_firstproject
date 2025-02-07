import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Player, PlayerScorePerRound, Result } from '../model/player.model';

@Injectable({ providedIn: 'root' })
export class BlackJackService {
  bet: number = 1;

  private playerSubject: BehaviorSubject<Player[]>;
  player$: Observable<Player[]>;
  score$: Observable<number[]>;

  initialPlayer = [
    {
      name: 'Dealer',
      score: [0],
      isDealer: true,
    },
    { name: 'Alice', score: [0], isDealer: false },
    { name: 'Bob', score: [0], isDealer: false },
    { name: 'Charlie', score: [0], isDealer: false },
  ];

  constructor() {
    this.playerSubject = new BehaviorSubject<Player[]>(this.initialPlayer);
    this.player$ = this.playerSubject.asObservable();
  }

  set setBet(bet: number) {
    this.bet = bet;
  }

  get getPlayerCount() {
    return this.playerSubject.value.length;
  }

  addPlayer(name: string, roundCount: number) {
    const newPlayer: Player = {
      name: name,
      score: Array(roundCount).fill(0),
      isDealer: false,
    };

    this.playerSubject.next([...this.playerSubject.value, newPlayer]);
  }

  switchDealer(newDealer: string) {
    const currentPlayers = this.playerSubject.value;
    const updatedPlayers = currentPlayers.map((player) => {
      if (player.isDealer) {
        return {
          ...player,
          isDealer: false,
        };
      }

      if (player.name === newDealer) {
        return {
          ...player,
          isDealer: true,
        };
      }
      return player;
    });

    this.playerSubject.next(updatedPlayers);
  }

  updatePlayerScore(playerScore: PlayerScorePerRound) {
    const currentPlayers = this.playerSubject.value;

    const updatedPlayers = currentPlayers.map((player) => {
      if (player.name === playerScore.playerName) {
        return {
          ...player,
          score: [...player.score, playerScore.score],
        };
      }
      return player;
    });

    this.playerSubject.next(updatedPlayers);
  }

  mapResultToScore(result: Result) {
    switch (result) {
      case Result.WIN:
        return this.bet;
      case Result.LOSE:
        return -this.bet;
      case Result.BLACKJACK:
        return this.bet * 2;
      case Result.FIVE_CARD:
        return this.bet * 2;
      case Result.PERFECT_BLACKJACK:
        return this.bet * 3;
      case Result.PUSH:
        return 0;
    }
  }
}
