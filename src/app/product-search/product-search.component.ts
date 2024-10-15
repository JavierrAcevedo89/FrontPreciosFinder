import { Component } from '@angular/core';
import { MercadoLibreService } from '../mercado-libre.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
})
export class ProductSearchComponent {
  query: string = '';
  products: any[] = [];

  constructor(private mercadoLibreService: MercadoLibreService) {}

  search(): void {
    if (this.query) {
      this.mercadoLibreService.searchProducts(this.query).subscribe((data) => {
        this.products = [data.results[0]];
      });
    }
  }
}