import { Injectable } from '@angular/core';
import { ImagePosition, Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { Player } from '../model/player.model';

@Injectable({ providedIn: 'root' })
export class ExportToExcel {
  private prepareData(players: Player[]) {
    if (!players || players.length === 0) {
      return [['Không có dữ liệu']];
    }

    const headers = [
      'Tên',
      ...players[0].score.map((_, index) => `Vòng ${index + 1}`),
      'Tổng điểm',
    ];

    const data = players.map((p) => [
      p.name,
      ...p.score,
      p.score.reduce((sum, score) => sum + score, 0),
    ]);

    return [headers, ...data];
  }

  async exportToExcel(
    players: Player[],
    chartImage: string,
    fileName: string = 'players.xlsx'
  ) {
    const workbook = new Workbook();
    const dataSheet = workbook.addWorksheet('Data');

    // Thêm dữ liệu vào sheet
    const sheetData = this.prepareData(players);
    sheetData.forEach((row) => dataSheet.addRow(row));

    // Định dạng bảng
    dataSheet.getRow(1).font = { bold: true };
    dataSheet.columns.forEach((col) => (col.width = 15));

    // Chèn ảnh biểu đồ
    if (chartImage) {
      const imageId = workbook.addImage({
        base64: chartImage.replace(/^data:image\/(png|jpg);base64,/, ''),
        extension: 'png',
      });

      dataSheet.addImage(imageId, {
        tl: { col: 0, row: sheetData.length + 2 }, // Chèn ảnh dưới bảng dữ liệu
        ext: { width: 600, height: 400 }, // Kích thước ảnh
      } as ImagePosition);
    }

    // Xuất file Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    fs.saveAs(blob, fileName);
  }
}
