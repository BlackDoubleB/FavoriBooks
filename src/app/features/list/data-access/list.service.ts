import { inject, Injectable, signal } from "@angular/core";
import { addDoc, collection, collectionData, doc, Firestore, getDoc, query, updateDoc, where } from "@angular/fire/firestore";
import { AuthStateService } from "../../services/auth/auth-state.service";
import { catchError, Observable, tap, throwError } from "rxjs";
import { toSignal } from '@angular/core/rxjs-interop';
import { Book } from "./list-view.service";
export interface List {
    id:string;
    title:string;
    completed:boolean;
    libros?: Book[]
}

export type ListCreate = Omit<List, 'id'>; 
const PATH = 'lists';
@Injectable()
export class ListService {
    private _firestore = inject(Firestore);
    private _authState = inject(AuthStateService);
    private _collection = collection(this._firestore, PATH)
    private _query = query(
        this._collection,
        where('userId', '==', this._authState.currentUser?.uid),

    );

    loading = signal<boolean>(true);

    getLists = toSignal(
        (
            collectionData(this._query, { idField: 'id' }) as  Observable<List[]>

        ).pipe(
            tap(()=> {
                this.loading.set(false);
               

            }),
            catchError((error) => {
                this.loading.set(false);
                return throwError(() => error);
            })
    ),
    {
        initialValue: [],
    });

    constructor(){
        console.log(this._authState.currentUser)
    }

    getList(id:string){
        const docRef = doc(this._collection, id);
        return getDoc(docRef);
    }

    create(list:ListCreate){
        return addDoc(this._collection,{
            ...list,
            userId:this._authState.currentUser?.uid,    
        });
    }
    update(list:ListCreate,id:string){
        const docRef =doc(this._collection, id);
        return updateDoc(docRef, {
            ...list,
            userId:this._authState.currentUser?.uid,
        })
    }

    
    
}
