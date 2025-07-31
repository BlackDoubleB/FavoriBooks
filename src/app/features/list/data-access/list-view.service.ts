import { inject, Injectable, signal } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { AuthStateService } from '../../services/auth/auth-state.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { List } from './list.service';

export interface Book {
  id?: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  score: number;
  review: string;
  userId?: string;
  idList?: string;
}
export type BookCreate = Omit<Book, 'id'>;

@Injectable()
export class ListViewService {
  private _firestore = inject(Firestore);

  // Método  para obtener referencia a la subcolección de libros
  getBooksRef(idListDocument: string): Observable<Book[]> {
     // 1. Obtén la referencia al documento padre en la colección 'lists'
    const listaDocRef = doc(this._firestore, 'lists', idListDocument);

    // 2. Obtén la referencia a la subcolección 'libros' dentro de ese documento padre
    const librosCollectionRef: CollectionReference<Book> = collection(listaDocRef, 'libros') as CollectionReference<Book>;

    // 3. Obtén los datos de los documentos en esa subcolección
    //    collectionData mapea automáticamente cada documento a su data
    return collectionData(librosCollectionRef, { idField: 'id' }); // { idField: 'id' } añade el ID del documento al objeto
  }


  createBook(bookForm: BookCreate, idListDocument: string) {
    // 1. Obtén la referencia al documento padre en la colección 'lists'
    const listaDocRef = doc(this._firestore, 'lists', idListDocument);
    const librosCollectionRef = collection(listaDocRef, 'libros');
    return addDoc(librosCollectionRef, {
      ...bookForm
    });
  }

  updateBook(bookId: string, bookForm: BookCreate, idListDocument: string,) {
    const listaDocRef = doc(this._firestore, 'lists', idListDocument);
     const libroDocRef = doc(listaDocRef, 'libros', bookId);
    return updateDoc(libroDocRef, {
      ...bookForm
    });
  }

  deleteBook(bookId:string, idListDocument: string){
     const listaDocRef = doc(this._firestore, 'lists', idListDocument);
     const libroDocRef = doc(listaDocRef, 'libros', bookId);
     return deleteDoc(libroDocRef);
  }
}
