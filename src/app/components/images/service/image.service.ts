import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../model/image.model';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private baseUrl = 'https://picsum.photos/v2/list';
  constructor(private httpClient: HttpClient) {}

  getImages() {
    return this.httpClient.get<Image[]>(this.baseUrl);
  }

  getImageDetail(imageId: string) {
    const imageDetailUrl = `https://picsum.photos/id/${imageId}/info`;

    return this.httpClient.get<Image>(imageDetailUrl);
  }
}
