import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../core/services/book.service';

@Component({
  selector: 'app-book-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-search.component.html'
})
export default class BookSearchComponent {
  searchQuery: string = '';
  books: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  constructor(private bookService:BookService) { }

  searchBooks():void {
    if(!this.searchQuery.trim()) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.books =[];

    this.bookService.searchBooks(this.searchQuery).subscribe({
      next: (response:any) => {
        this.books = response.items || [];
        this.isLoading = false;
      },
      error:(error) =>{
        this.errorMessage = 'Error fetching books. Please try again.';
        this.isLoading = false;
        console.error('Error fetching books:', error);
      }
    })

  }
}
