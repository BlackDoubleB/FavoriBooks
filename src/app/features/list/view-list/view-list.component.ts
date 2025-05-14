import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BookCreate, ListViewService } from '../data-access/list-view.service';
import { toast } from 'ngx-sonner';

export interface DialogData {
  animal: string;
  name: string;
}

export interface FormAddBook {
  title: FormControl<string | null>;
  author: FormControl<string | null>;
  genre: FormControl<string | null>;
  description: FormControl<string | null>;
  score: FormControl<number | null>;
  review: FormControl<string | null>;
  idBook: FormControl<string | null>;
}
//Component to open the dialog
@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'dialog-overview.component.html',
  imports: [FormsModule, ReactiveFormsModule],
  providers: [ListViewService],
})
export default class DialogOverviewExample {
  private _formBuilder = inject(FormBuilder);
  private _bookService = inject(ListViewService);
  idList = input.required<string>();


  form = this._formBuilder.group<FormAddBook>({
    title: this._formBuilder.control('', [Validators.required]),
    author: this._formBuilder.control('', [Validators.required]),
    genre: this._formBuilder.control('', [Validators.required]),
    description: this._formBuilder.control('', [Validators.required]),
    score: this._formBuilder.control(0, [Validators.required]),
    review: this._formBuilder.control('', [Validators.required]),
    idBook: this._formBuilder.control('', [Validators.required]),
  });

  async submitBook() {
    if (this.form.invalid) return;

    try {
      const { title, author, genre, description, score, review, idBook } = this.form.value;
      const book: BookCreate = {
        title: title || '',
        author: author || '',
        genre: genre || '',
        description: description || '',
        score: score || 0,
        review: review || '',
        idBook: idBook || '',
      }
      const idList = this.idList();
      if (idList) {
        if (idBook && idList) {
          await this._bookService.updateBook(book, idBook, idList);
        } else {
          throw new Error('idBook or idList is missing');
        }
      } else {
        await this._bookService.createBook(book,this.idList());
      }
       toast.success(`Book ${idBook ? 'updated' : 'created'} successfully!`);

    }
     catch(e) {
    console.log(e);
  }
}
}
