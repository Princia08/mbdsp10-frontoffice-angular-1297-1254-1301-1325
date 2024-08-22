import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  // propriété pour savoir si l'utilisateur est connecté
  loggedIn = false;

  logIn(token: string, id: string) {
    // on stock le token dans le localStorage du header
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    this.router.navigateByUrl('/home');
    this.loggedIn = true;
  }

  logOut() {
    // on retire le token du localStorage du header
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigateByUrl('/');
    this.loggedIn = false;
  }
}
