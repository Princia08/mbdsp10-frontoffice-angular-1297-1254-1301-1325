import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {

  constructor(private router: Router, private userService: UserService) {
  }

  userForm = new FormGroup({
    username: new FormControl('Princia',[Validators.required]),
    email: new FormControl('princia@gmail.com',[Validators.required]),
    password: new FormControl('pppppp',[Validators.required]),
    address: new FormControl('Ambohimiandra',[Validators.required]),
    role: new FormControl('',[Validators.required])
  })

  errorMessage = '';

  signup() {
    this.userForm.patchValue({role: 'USER'})
    console.log(this.userForm.value)
    if(this.userForm.valid) {
      console.log(this.userForm.value)
      this.userService.signup(this.userForm.value).subscribe({
        next: res => {
          this.router.navigateByUrl('')
        },
        error: err => {
          this.errorMessage = err.error.message
        }
      })
    }
  }
}
