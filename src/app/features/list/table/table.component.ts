import { Component, input } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { List } from '../data-access/list.service';
@Component({
  selector: 'app-table',
  imports: [RouterLink],
  templateUrl: './table.component.html',
})
export class TableComponent {

  lists = input.required<List[]>();
}
