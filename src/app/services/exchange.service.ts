import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(private http: HttpClient) {
  }

  url = environment.apiURL;

  createExchange(exchange: any): Observable<any> {
    return this.http.post(this.url + '/exchanges', exchange);
  }
}
