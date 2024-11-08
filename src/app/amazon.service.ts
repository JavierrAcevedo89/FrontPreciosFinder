import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AmazonService {
  private apiUrl  = "https://real-time-amazon-data.p.rapidapi.com/search"; 
  private headers = new HttpHeaders()
    .set('X-Rapidapi-Key', '35b39687dbmshb9368d55c2680b4p1f92c6jsn2a75b344eab8')
    .set('X-Rapidapi-Host', 'real-time-amazon-data.p.rapidapi.com');

  constructor (private http : HttpClient){}

  searchProducts(query: string): Observable<any> {
    const params = new HttpParams().set('query', query).set('page', '1');
    return this.http.get(this.apiUrl, { headers: this.headers, params });
  }

  searchProductsV2(query: string): Observable<any> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', '1')
      .set('limit', '5');  
    return this.http.get(this.apiUrl, { headers: this.headers, params });
  }
}
