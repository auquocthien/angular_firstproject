import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const timeOut = 3000;

@Injectable({ providedIn: 'root' })
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  success(message: string, title: string = 'success') {
    this.toastr.success(message, title, { timeOut });
  }

  error(message: string, title: string = 'error') {
    this.toastr.error(message, title, { timeOut });
  }
}
