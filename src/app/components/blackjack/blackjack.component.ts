import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Player, PlayerScorePerRound } from './model/player.model';
import { NgFor } from '@angular/common';
import { RowComponent } from './component/row/row.component';
import { BlackJackService } from './service/blackjack.service';
import { FormsModule } from '@angular/forms';
import { ExportToExcel } from './service/export.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-blackjack',
  imports: [NgFor, RowComponent, FormsModule],
  templateUrl: './blackjack.component.html',
  styleUrl: './blackjack.component.scss',
})
export class BlackJackComponent implements OnInit {
  players: Player[] = [];
  newPlayerName: string;
  bet: number = 1;
  roundCount: number = 0;
  round: PlayerScorePerRound[] = [];
  playerWillScroll: string;

  @ViewChildren('playerRow') playerRowRef: QueryList<RowComponent>;
  @ViewChild('chartContainer', { static: false })
  chartContainer!: ElementRef<HTMLDivElement>;

  private chart!: echarts.ECharts;

  constructor(
    private blackjackService: BlackJackService,
    private exportService: ExportToExcel
  ) {}

  ngOnInit(): void {
    this.blackjackService.player$.subscribe((players) => {
      this.players = players;
    });
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart() {
    const chartDom = this.chartContainer.nativeElement;
    this.chart = echarts.init(chartDom);
    this.updateChart();
  }

  private updateChart() {
    if (!this.chart) return;

    const option = {
      backgroundColor: '#f5f5f5',
      title: { text: 'Bảng điểm' },
      xAxis: { type: 'category', data: this.players.map((p) => p.name) },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'bar',
          data: this.players.map((p) => p.score.reduce((sum, s) => sum + s, 0)),
        },
      ],
    };

    this.chart.setOption(option, { notMerge: true });
  }

  getChartImage(): string {
    return this.chart.getDataURL({ type: 'png' });
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
        this.updateChart();
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

  exportFile() {
    this.createChart();
    this.exportService.exportToExcel(this.players, this.getChartImage());
  }
}
