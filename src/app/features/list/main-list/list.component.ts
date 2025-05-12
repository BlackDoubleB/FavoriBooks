import { Component, inject } from '@angular/core';
import RecordComponent  from '../record/record.component'
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [  RecordComponent, RouterOutlet], 
  templateUrl: './list.component.html',
})
export default class ListComponent {
 private router = inject(Router);

  isEditOrNewRoute(): boolean {
    const url = this.router.url;
    return url.startsWith('/lists/new') || url.startsWith('/lists/edit/');
  }
}

