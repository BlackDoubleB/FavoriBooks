import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Book, ListViewService } from '../data-access/list-view.service';
import { TableListBookComponent } from '../table-list-book/table-list-book.component';
import { CommonModule } from '@angular/common'; // Añade esta línea
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { isRequired } from '../../auth/utils/validators';
export interface FormAddBook {
  title: FormControl<string | null>;
  author: FormControl<string | null>;
  genre: FormControl<string | null>;
  description: FormControl<string | null>;
  score: FormControl<number | null>;
  review: FormControl<string | null>;
}

//Component to open the dialog
@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'dialog-overview.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TableListBookComponent,
    CommonModule,
  ],
  providers: [ListViewService],
})
export default class DialogOverviewExample {
  private _formBuilder = inject(FormBuilder);
  listViewService = inject(ListViewService);
  private route = inject(ActivatedRoute);
  idList = this.route.snapshot.paramMap.get('idList');

  libros$: Observable<Book[]> = this.idList
    ? this.listViewService.getBooksRef(this.idList)
    : of([]);

  form = this._formBuilder.group<FormAddBook>({
    title: this._formBuilder.control('', [Validators.required]),
    author: this._formBuilder.control('', [Validators.required]),
    genre: this._formBuilder.control('', [Validators.required]),
    description: this._formBuilder.control('', [Validators.required]),
    score: this._formBuilder.control(0, [Validators.required]),
    review: this._formBuilder.control('', [Validators.required]),
  });

  open = signal(false);
  openDialog() {
    this.open.set(true);
  }
  closeDialog() {
    this.open.set(false);
    this.form.reset();
    this.selectedBook = null; // Añade esta línea
  }

  isRequired(field: 'title'| 'author' | 'genre' | 'description' | 'score' | 'review') {
      return isRequired(field, this.form);
    }

  async AddBook(){
  if(this.form.invalid) return;
  try{
    const {title, author, genre, description, score, review } = this.form.value;
    const bookForm : Book = {
      title: title || '',
      author: author || '',
      genre: genre || '',
      description: description || '',
      score: score || 0,
      review: review || '',
    }
     if (this.selectedBook && this.selectedBook.id) {
      // Actualizar libro existente
      await this.listViewService.updateBook(
        this.selectedBook.id,
        bookForm,
        this.idList as string
      );
    } else {
      // Crear nuevo libro
      await this.listViewService.createBook(bookForm, this.idList as string);
    }
    
    this.form.reset(); // Limpia el formulario después de enviar
    this.selectedBook = null;
    this.closeDialog(); // Cierra el diálogo

  }catch(error){
    console.log('Error creating book because:', error);
  } 
  }


  async UpdateBook(){

  }
   selectedBook: Book | null = null;

  // Agrega este método para manejar la edición
  onEditBook(book: Book) {
    this.selectedBook = book;
    this.form.patchValue({
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      score: book.score,
      review: book.review
    });
    this.openDialog();
  }

}
