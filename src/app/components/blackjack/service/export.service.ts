import { Injectable } from '@angular/core';
import { Player } from '../model/player.model';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class ExportToExcel {
  private prepareDataSheet(players: Player[]) {
    const extractData = players.map((p) => {
      return [
        p.name,
        ...p.score,
        p.score.reduce((finalScore, current) => finalScore + current, 0),
      ];
    });

    return [
      [
        'Ten',
        ...players[0].score.map((score, index) => `Vong ${index}`),
        'Tong diem',
      ],
      ...extractData,
    ];
  }

  exportToExcel(players: Player[]) {
    const sheetData = this.prepareDataSheet(players);

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(sheetData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data: Blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });

    saveAs(data, 'players.xlsx');
  }
}
