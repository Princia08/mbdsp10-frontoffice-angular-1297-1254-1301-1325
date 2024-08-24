import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) {}

  url = environment.apiURL;

  getAllCategories(): Observable<any> {
    return this.http.get(this.url + '/categories');
  }

  getAllProducts(): Observable<any> {
    return this.http.get(this.url + '/products');
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.url + '/products', product);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(this.url + '/products/' + id);
  }

  getProductByUserId(userId: string): Observable<any> {
    return this.http.get(this.url + '/products?userId='+userId);
  }
}
