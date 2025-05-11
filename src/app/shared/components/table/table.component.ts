import { Component, input } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { List } from '../../../features/list/data-access/list.service';
@Component({
  selector: 'app-table',
  imports: [RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  lists = input.required<List[]>();
}
