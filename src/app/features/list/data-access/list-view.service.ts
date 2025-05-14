import { inject, Injectable } from "@angular/core";
import { addDoc, collection, doc, Firestore, updateDoc } from "@angular/fire/firestore";
import { AuthStateService } from "../../services/auth/auth-state.service";

 export interface BookCreate {
        title: string;
        author: string;
        genre: string;
        description: string;
        score: number;
        review: string;
        idBook: string;
    }

const PATH = 'book'
@Injectable()
export class ListViewService {
    private _firestore = inject(Firestore);
    private _collection = collection(this._firestore, PATH);
    private _authState = inject(AuthStateService)


   createBook(book: BookCreate, idList: string) {
    return addDoc(this._collection,{
        ...book,
        userId:this._authState.currentUser?.uid,
        idList:idList
    });
   }

   updateBook(book: BookCreate, idBook: string , idList: string) {
    const docRef = doc(this._collection, idBook);
    return updateDoc(docRef,{ 
        ...book,
        userId:this._authState.currentUser?.uid,
        idList:idList
    })
   }


}