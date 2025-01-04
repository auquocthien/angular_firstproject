import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor() {}

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    return localStorage.removeItem(key);
  }

  clear() {
    return localStorage.clear();
  }
}
