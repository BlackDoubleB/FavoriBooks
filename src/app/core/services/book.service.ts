import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";


@Injectable({ providedIn: 'root' })
export class BookService {
  private BASE_API = environment.apiBaseUrl; 

  constructor(private http: HttpClient) {}

  searchBooks(query: string, maxResults: number = 10): Observable<any> {
    return this.http.get(`${this.BASE_API}/books/search`, {
      params: { q: query, maxResults }
    });
  }

  getBookDetails(bookId: string): Observable<any> {
    return this.http.get(`${this.BASE_API}/books/${encodeURIComponent(bookId)}`);
  }
}
