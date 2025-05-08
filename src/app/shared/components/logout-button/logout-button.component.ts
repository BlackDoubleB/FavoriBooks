import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthStateService } from '../../services/auth/auth-state.service';
@Component({
  selector: 'app-logout-button',
  imports: [RouterModule],
  templateUrl: './logout-button.component.html',
})
export class LogoutButtonComponent {
  private _authState = inject(AuthStateService);
  private _router = inject(Router);

  async logOut(){
    await this._authState.logOut();
    this._router.navigateByUrl('/auth/sign-in')
  }
}
