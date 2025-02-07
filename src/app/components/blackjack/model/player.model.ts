export interface Player {
  name: string;
  score: number[];
  isDealer: boolean;
}

export interface PlayerScorePerRound {
  playerName: string;
  score: number;
  isDealer: boolean;
}

export enum Result {
  WIN = 'ăn',
  LOSE = 'thua',
  BLACKJACK = 'xì dách',
  FIVE_CARD = 'ngũ linh',
  PERFECT_BLACKJACK = 'xì bàn',
  PUSH = 'chay',
}
