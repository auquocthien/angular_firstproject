import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../model/image.model';
import { map } from 'rxjs';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { imageUrl } from '../../../../config';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  // private baseUrl = 'https://picsum.photos/v2/list';

  constructor(
    private httpClient: HttpClient,
    private localService: LocalStorageService
  ) {}

  getImages() {
    // return this.httpClient.get<Image[]>(this.baseUrl).pipe(
    //   map((images) => {
    //     const imageAfterTransform = images.map((image, index) =>
    //       this.transformData(image, index)
    //     );
    //     return imageAfterTransform;
    //   })
    // );
    const idToken = this.localService.getItem('idToken');
    const url = `${imageUrl}.json?auth=${idToken}`;
    return this.httpClient.get<Image[]>(url);
  }

  getImageDetail(imageId: string) {
    // const imageDetailUrl = `https://picsum.photos/id/${imageId}/info`;
    const imageDetailUrl = `https://angular-71209-default-rtdb.firebaseio.com/images/${imageId}.json`;

    return this.httpClient.get<Image>(imageDetailUrl);
  }

  // transformData(image: Image, index: number) {
  //   image.quantity = this.extraImageInfo[index].quantity;
  //   image.price = this.extraImageInfo[index].price;
  //   image.isOutOfStock = false;

  //   return image;
  // }
}
