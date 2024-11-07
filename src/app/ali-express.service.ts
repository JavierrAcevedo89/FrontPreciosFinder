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
    'x-rapidapi-key': 'cfe28fa81fmsh33a6fc97e8bbd81p113af6jsnea919341d41d',
    'x-rapidapi-host': 'aliexpress-datahub.p.rapidapi.com',
  });

  constructor(private http: HttpClient) {}

  searchProducts(query: string): Observable<any> {
    const params = new HttpParams().set('q', query).set('page', '1');
    return this.http.get(this.apiUrl, { headers: this.headers, params });
  }

  searchProductsV2(query: string): Observable<any> {
    return this.searchProducts(query).pipe(
      map((data: any) => {
        const resultList = data.result?.resultList || [];

        // Mapea los primeros 5 productos
        return resultList.slice(0, 5).map((item: any) => ({  
          title: item.title,
          image: `https:${item.image}`,  
          itemUrl: `https:${item.itemUrl}`, 
        }));
      })
    );
  }
}
