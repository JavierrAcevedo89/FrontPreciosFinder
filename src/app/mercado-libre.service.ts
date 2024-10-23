import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MercadoLibreService {
  private apiUrl = 'https://api.mercadolibre.com/sites/MLM/search?q=';

  constructor(private http: HttpClient) {}

  searchProducts(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${query}`);
  }
}
