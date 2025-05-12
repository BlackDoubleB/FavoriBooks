import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, LogoutButtonComponent],
  templateUrl: './layout.component.html'
})
export default class LayoutComponent {

}
