import { Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { List, ListCreate, ListService } from '../data-access/list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  providers: [ListService],
})
export default class FormComponent {
  private _formBuilder = inject(FormBuilder);
  private _listService = inject(ListService);
  private _router = inject(Router);

  loading = signal(false);
  idList = input.required<string>();

  form = this._formBuilder.group({
    title: this._formBuilder.control('', Validators.required),
    completed: this._formBuilder.control(false, Validators.required),
  });


  constructor(){
    effect(()=>{
      console.log(this.idList());
      const id = this.idList();
      if (id) {
        this.getList(id);
      }})
  }

  async submit(){
    if(this.form.invalid) return;

    try{
      this.loading.set(true);
      const {title, completed } = this.form.value;
      const list : ListCreate = {
        title: title || '',
        completed: !!completed,
      };

      const id = this.idList();
      if(id){
        await this._listService.update(list,id)
      } else {
        await this._listService.create(list);
      }

      toast.success(`List ${id? 'updated' : 'created'} successfully`);
      this._router.navigateByUrl('/lists');
    }catch(error){
      toast.error('Error creating list');
    }finally{
      this.loading.set(false);
    }
  }

  async getList(id:string){
    const listSnapshot = await this._listService.getList(id);
    if(!listSnapshot.exists())return;

    const list = listSnapshot.data() as List;
    this.form.patchValue(list)
  }
}
