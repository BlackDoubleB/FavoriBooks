import { Component, inject } from '@angular/core';
import { ListService } from '../../../features/list/data-access/list.service';
import { RouterLink } from '@angular/router';
import { TableComponent } from '../table/table.component';
@Component({
  selector: 'app-record',
  imports: [RouterLink, TableComponent],
  templateUrl: './record.component.html',
  providers: [ListService],
})
export default class RecordComponent {
   listsService = inject(ListService);
}
