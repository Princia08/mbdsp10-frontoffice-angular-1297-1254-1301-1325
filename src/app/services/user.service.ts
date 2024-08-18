import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  url = environment.apiURL;

  signup(user: any): Observable<any> {
    return this.http.post(this.url + '/auth/register', user);
  }

  login(user: any): Observable<any> {
    return this.http.post(this.url + '/auth/login', user);
  }
}
