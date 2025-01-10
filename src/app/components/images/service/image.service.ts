import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../model/image.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private baseUrl = 'https://picsum.photos/v2/list';
  // extraImageInfo = [
  //   { price: 86, quantity: 5, isOutOfStock: false },
  //   { price: 4, quantity: 4, isOutOfStock: true },
  //   { price: 15, quantity: 1, isOutOfStock: true },
  //   { price: 69, quantity: 1, isOutOfStock: true },
  //   { price: 7, quantity: 7, isOutOfStock: false },
  //   { price: 26, quantity: 9, isOutOfStock: false },
  //   { price: 96, quantity: 9, isOutOfStock: true },
  //   { price: 40, quantity: 5, isOutOfStock: false },
  //   { price: 47, quantity: 10, isOutOfStock: false },
  //   { price: 94, quantity: 10, isOutOfStock: false },
  //   { price: 82, quantity: 6, isOutOfStock: false },
  //   { price: 33, quantity: 8, isOutOfStock: false },
  //   { price: 9, quantity: 5, isOutOfStock: true },
  //   { price: 76, quantity: 2, isOutOfStock: false },
  //   { price: 59, quantity: 1, isOutOfStock: false },
  //   { price: 52, quantity: 7, isOutOfStock: false },
  //   { price: 76, quantity: 5, isOutOfStock: false },
  //   { price: 77, quantity: 10, isOutOfStock: false },
  //   { price: 90, quantity: 3, isOutOfStock: false },
  //   { price: 8, quantity: 4, isOutOfStock: false },
  //   { price: 37, quantity: 8, isOutOfStock: true },
  //   { price: 64, quantity: 6, isOutOfStock: false },
  //   { price: 29, quantity: 9, isOutOfStock: false },
  //   { price: 75, quantity: 6, isOutOfStock: false },
  //   { price: 46, quantity: 8, isOutOfStock: true },
  //   { price: 95, quantity: 3, isOutOfStock: false },
  //   { price: 95, quantity: 10, isOutOfStock: false },
  //   { price: 35, quantity: 3, isOutOfStock: false },
  //   { price: 45, quantity: 9, isOutOfStock: false },
  //   { price: 99, quantity: 6, isOutOfStock: false },
  // ];

  constructor(private httpClient: HttpClient) {}

  getImages() {
    // return this.httpClient.get<Image[]>(this.baseUrl).pipe(
    //   map((images) => {
    //     const imageAfterTransform = images.map((image, index) =>
    //       this.transformData(image, index)
    //     );
    //     return imageAfterTransform;
    //   })
    // );
    return this.httpClient.get<Image[]>(
      'https://angular-71209-default-rtdb.firebaseio.com/images.json'
    );
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
