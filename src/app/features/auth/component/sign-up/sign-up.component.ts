import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import {
  hasEmailError,
  hasPasswordError,
  isRequired,
} from '../../utils/validators';
import { toast } from 'ngx-sonner';

interface FormSignUp {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
})
export default class SignUpComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }
  hasPasswordError() {
    return hasPasswordError(this.form);
  }
  form = this._formBuilder.group<FormSignUp>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  async submit() {
    if (this.form.invalid) return;
    try {
      const { email, password } = this.form.value;
      if (!email || !password) return;
      console.log({ email, password });

      await this._authService.signUp({ email, password });
      toast.success('User created successfully!');
      this._router.navigateByUrl('/home');
    } catch (error: any) {
      let msg =
        error?.message ||
        error?.code ||
        'Error creating user, please try again!';
      if (msg.includes(':')) {
        msg = msg.split(':').slice(1).join(':').trim();
      }

      msg = msg
        .replace(/[()]/g, '') 
        .replace(/[-/]/g, ' ') 
        .replace(/auth/g, '') 
        .replace(/Error/g, '') 
        .replace(/email/g, 'Email') 
        .trim();
      msg = msg.charAt(0).toUpperCase() + msg.slice(1);

      toast.error(msg);
    }
  }
}
