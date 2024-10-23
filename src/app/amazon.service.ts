import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AmazonService {
  private apiUrl  = "https://real-time-amazon-data.p.rapidapi.com/search"; 
  private headers = new HttpHeaders()
    .set('X-Rapidapi-Key', '2b4ce71189msh683d04a5e19e562p118520jsncb129bfd8da4')
    .set('X-Rapidapi-Host', 'real-time-amazon-data.p.rapidapi.com');

  constructor (private http : HttpClient){}

  searchProducts(query: string): Observable<any> {
    const params = new HttpParams().set('query', query).set('page', '1');
    return this.http.get(this.apiUrl, { headers: this.headers, params });
  }
}
