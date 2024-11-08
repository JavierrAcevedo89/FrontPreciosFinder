import { Component, OnInit } from '@angular/core';
import { MercadoLibreService } from '../mercado-libre.service';
import { AliexpressService } from '../ali-express.service';
import { AmazonService} from '../amazon.service'
import { EbayService } from '../ebay.service';


@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
})
export class ProductSearchComponent {
  query: string = '';
  productsMercado: any[] = [];
  productsAli: any[] = [];
  productsAmazon: any[] = [];
  productsEbay: any = null;

  constructor(
    private mercadoLibreService: MercadoLibreService,
    private AliexpressService: AliexpressService, 
    private AmazonService: AmazonService,
    private EbayService: EbayService
  ) {}

  search(): void {
    if (this.query) {
      this.performSearch(this.query);
    }
  }

  searchTodo(): void {
    this.mercadoLibreService.searchProducts(this.query).subscribe((data) => {
      this.productsMercado = [data.results[0]];
    });

    // this.AliexpressService.searchProducts(this.query).subscribe((data) => {
    //   const resultList = data.result?.resultList || [];
    //   if (resultList.length > 0) {
    //     const item = resultList[0].item;
    //     if (item) {
    //       this.productsAli = [{
    //         title: item.title, 
    //         image: `https:${item.image}`, 
    //         itemUrl: `https:${item.itemUrl}`, 
    //       }];
    //     }
    //   }
    // });

    // this.AmazonService.searchProducts(this.query).subscribe((data) => {
    //   const products = data.data?.products || [];
    //   if (products.length > 0) {
    //     const product = products[0]; 
    //     if (product) {
    //       this.productsAmazon = [{
    //         title: product.product_title, 
    //         image: product.product_photo, 
    //         url: product.product_url, 
    //       }];
    //     }
    //   }
    // });
    
    this.EbayService.searchProduct(this.query).subscribe((result) => {
          this.productsEbay = result;
          console.log(result);
      });
  }

  searchCategory(category: string): void {
    this.performSearch(category);
  }

  public performSearch(query: string): void {
    this.mercadoLibreService.searchProducts(query).subscribe((data) => {
      this.productsMercado = data.results.slice(0,5); 
    });

    this.EbayService.searchProductV2(query).subscribe((result) => {
      this.productsEbay = result;
      console.log(result);
    });    
    
    this.AmazonService.searchProductsV2(query).subscribe((result) => {
      this.productsAmazon = result.data.products.slice(0, 5);
      console.log(this.productsAmazon);  
    });

    this.AliexpressService.searchProductsV2(query).subscribe((data) => {
      this.productsAli = data;
      console.log(data);  
    });
  }
}