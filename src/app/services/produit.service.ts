import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) {}

  url = environment.apiURL;

  getAllCategorie(): Observable<any> {
    return this.http.get(this.url + '/categories');
  }

  getAllProducts(): Observable<any> {
    return this.http.get(this.url + '/products');
  }
}
