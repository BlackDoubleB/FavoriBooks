import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { isRequired, hasEmailError } from '../../utils/validators';
import { toast } from 'ngx-sonner';

interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export default class SignInComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSignIn>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', Validators.required),
  });

  async submit() {
    if (this.form.invalid) return;

    try {
      const {email, password} = this.form.value;
      if(!email || !password) return;
      console.log({email, password});

      await this._authService.signIn({email, password});
      toast.success("Hello, welcome back!")
      this._router.navigateByUrl('/home');
    } catch (error) {
      toast.error('Invalid email or password');
    }
  }

  async submitWhithGoogle() {
    try{
      await this._authService.signWhithGoogle();
      toast.success("Hello, welcome back!");
      this._router.navigateByUrl('/home');
    }catch (error) {
      console.log("Ocurrio",error);
      toast.error('Invalid email or password');
    }
  }
}
