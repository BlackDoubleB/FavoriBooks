import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

interface FormSignIn{
  email:FormControl<string | null>;
  password:FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export default class SignInComponent {

}
