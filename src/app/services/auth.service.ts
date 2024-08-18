import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  // propriété pour savoir si l'utilisateur est connecté
  loggedIn = false;

  logIn(token: string) {
    // on stock le token dans le localStorage du header
    localStorage.setItem('token', token);
    this.router.navigateByUrl('/home');
    this.loggedIn = true;
  }

  logOut() {
    // on retire le token du localStorage du header
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
    this.loggedIn = false;
  }
}
