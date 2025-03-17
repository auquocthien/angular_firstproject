import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AddressService {
  private baseApi = 'https://vapi.vnappmob.com';
  private cities = '/api/v2/province/';
  private districts = '/api/v2/province/district/';
  private wards = '/api/v2/province/ward/';

  constructor(private httpClient: HttpClient) {}

  getCities() {
    return this.httpClient.get(`${this.baseApi}${this.cities}`, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  getDistricts(provinceId: string) {
    return this.httpClient.get(
      `${this.baseApi}${this.districts}${provinceId}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );
  }

  getWard(districtId: string) {
    return this.httpClient.get(`${this.baseApi}${this.wards}${districtId}`, {
      headers: {
        Accept: 'application/json',
      },
    });
  }
}
