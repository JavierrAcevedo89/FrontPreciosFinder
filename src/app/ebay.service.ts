import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EbayService {
  private baseUrl = 'https://ebay-search-result.p.rapidapi.com/search';
  private headers = new HttpHeaders({
    'x-rapidapi-key': '35b39687dbmshb9368d55c2680b4p1f92c6jsn2a75b344eab8',
    'x-rapidapi-host': 'ebay-search-result.p.rapidapi.com'
  });

  constructor(private http: HttpClient) {}

  searchProduct(query: string): Observable<any> {
    const url = `${this.baseUrl}/${query}`;
    return this.http.get<any>(url, { headers: this.headers }).pipe(
      map(response => response && response.results ? response.results[0] : null)
    );
  }
}
