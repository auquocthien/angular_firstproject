import { Component } from '@angular/core';
import { SearchPopupComponent } from '../search-result/search-result.component';

@Component({
  selector: 'app-search',
  imports: [SearchPopupComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  showModalSearch = false;
  searchText = '';

  setSearchText(event: Event) {
    this.searchText = (event.target as HTMLInputElement).value;
    this.searchText == ''
      ? (this.showModalSearch = false)
      : (this.showModalSearch = true);
  }
}
