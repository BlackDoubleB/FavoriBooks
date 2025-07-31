import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../data-access/list-view.service';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-table-list-book',
  imports: [CommonModule],
  templateUrl: './table-list-book.component.html',
})
export class TableListBookComponent {
// En TableListBookComponent
@Input() books: Observable<Book[]> = of([]); 
// = of([]):Valor por defecto: Si el componente padre no pasa ningún valor a [books], se usará of([]). Es un Observable que emite un array vacío ([]) inmediatamente.Evita errores si books es undefined o null.
  @Output() editBook = new EventEmitter<Book>();

  onEdit(book: Book) {
    this.editBook.emit(book);
  }

  @Output() deleteBook = new EventEmitter<Book>();
  onDelete(book: Book) {
    this.deleteBook.emit(book);
  }

}
