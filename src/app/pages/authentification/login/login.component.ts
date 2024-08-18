import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private userService: UserService, private authService: AuthService) {
  }

  userForm = new FormGroup({
    email: new FormControl('perdo-alvarez@it-univerisity.mg', [Validators.required]),
    password: new FormControl('motdepasse', [Validators.required])
  })

  errorMessage = '';

  login() {
    if(this.userForm.valid) {
      this.userService.login(this.userForm.value).subscribe({
        next: res => {
          this.authService.logIn(res.data.access_token)
        },
        error: err => {
          this.errorMessage = err.error.message
        }
      })
    }
  }
}
