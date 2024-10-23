import { Component } from '@angular/core';
import { MercadoLibreService } from '../mercado-libre.service';
import { AliexpressService } from '../ali-express.service';
import { AmazonService} from '../amazon.service'


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

  constructor(
    private mercadoLibreService: MercadoLibreService,
    private AliexpressService: AliexpressService, 
    private AmazonService: AmazonService
  ) {}

  search(): void {
    if (this.query) {
      this.mercadoLibreService.searchProducts(this.query).subscribe((data) => {
        this.productsMercado = [data.results[0]];
      });
      // this.AliexpressService.searchProducts(this.query).subscribe((data) => {
      //   // Accede al primer producto en la lista de resultados
      //   const resultList = data.result?.resultList || [];
      //   if (resultList.length > 0) {
      //     const item = resultList[0].item;
      //     if (item) {
      //       // Asegúrate de que la URL de la imagen y el enlace estén completos
      //       this.productsAli = [{
      //         title: item.title, // El título del producto
      //         image: `https:${item.image}`, // Añade el prefijo https: a la imagen
      //         itemUrl: `https:${item.itemUrl}`, // Añade el prefijo https: al enlace
      //       }];
      //     }
      //   }
      // });
      
      this.AmazonService.searchProducts(this.query).subscribe((data) => {
        const products = data.data?.products || [];
        if (products.length > 0) {
          const product = products[0]; 
          if (product) {
            this.productsAmazon = [{
              title: product.product_title, 
              image: product.product_photo, 
              url: product.product_url, 
            }];
          }
        }
      });
      
    }
  }
}