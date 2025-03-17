import { NgClass, UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { AddressService } from '../../../services/address.service';
@Component({
  selector: 'app-address-form',
  imports: [UpperCasePipe, NgClass, NgSelectComponent, FormsModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFormComponent implements OnInit {
  addressForm: FormGroup;

  cities: any;
  districts: any;
  wards: any;

  selectedCity: string;
  selectedDistrict: string;
  selectedWard: string;

  @Input() externalClass: string[];

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getCities();
  }

  getCities() {
    this.addressService.getCities().subscribe((data) => {
      console.log(data);

      this.cities = data['results']
        .map((city) => {
          return {
            ...city,
            province_name: city.province_name.replace(/^(Thành phố|Tỉnh)/, ''),
          };
        })
        .sort((a, b) => a.province_name.localeCompare(b.province_name));
    });
  }

  getDistrict(provinceId: string) {
    this.addressService.getDistricts(provinceId).subscribe((data) => {
      console.log(data['results']);

      this.districts = data['results'];
    });
  }

  getWard(districtId: string) {
    this.addressService.getWard(districtId).subscribe((data) => {
      this.wards = data['results'];
    });
  }

  onSelectCity(city: any) {
    console.log(city['province_id']);

    this.getDistrict(city['province_id']);
    this.cd.markForCheck();
  }

  onSelectDistrict(district: any) {
    this.getWard(district['district_id']);
  }
}
