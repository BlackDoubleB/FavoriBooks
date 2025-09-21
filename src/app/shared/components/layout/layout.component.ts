import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, LogoutButtonComponent, CommonModule],
  templateUrl: './layout.component.html',
})
export default class LayoutComponent {
  open = false;
  open_menu() {
    this.open = true;
  }
  close_menu() {
    this.open = false;
  }
}
