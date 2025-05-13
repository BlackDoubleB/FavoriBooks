import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class BookService {
    private API_KEY = 'AIzaSyCkt5jRuZYa889gNAXkBG5ZoO9z0C-YpjA'
    private API_URL = 'https://www.googleapis.com/books/v1/volumes';

    constructor(private http:HttpClient) { }

    searchBooks(query: string, maxResults:number = 10): Observable<any> {
        const  url = `${this.API_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${this.API_KEY}`;
        return this.http.get(url);
    }
    getBookDetails(bookId: string): Observable<any> {
        const url = `${this.API_URL}/${bookId}?key=${this.API_KEY}`;
        return this.http.get(url);
    }
}