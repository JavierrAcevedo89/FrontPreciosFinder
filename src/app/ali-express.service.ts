import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AliexpressService {
  private apiUrl = 'https://aliexpress-datahub.p.rapidapi.com/item_search_3?q=';
  private headers = new HttpHeaders({
    'x-rapidapi-key': '35b39687dbmshb9368d55c2680b4p1f92c6jsn2a75b344eab8',
    'x-rapidapi-host': 'aliexpress-datahub.p.rapidapi.com',
  });

  constructor(private http: HttpClient) {}

  searchProducts(query: string): Observable<any> {
    const params = new HttpParams().set('q', query).set('page', '1');
    return this.http.get(this.apiUrl, { headers: this.headers, params });
  }

  searchProductsV2(query: string): Observable<any> {
    const params = new HttpParams().set('q', query).set('page', '1');
  
    return this.http.get(this.apiUrl, { headers: this.headers, params }).pipe(
      map((data: any) => {
        // Accede a los productos dentro de `resultList` y en el objeto `item`
        const items = data.result?.resultList?.map((listItem: any) => listItem.item).flat();
  
        // Mapea los primeros 5 productos
        return (items || []).slice(0, 5).map((item: any) => ({
          title: item.title,
          image: item.image ? `https:${item.image}` : '', // URL completa de la imagen
          itemUrl: item.itemUrl ? `https:${item.itemUrl}` : '', // URL completa del producto
        }));
      })
    );
  }  
}
