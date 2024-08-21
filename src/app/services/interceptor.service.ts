import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  private token = localStorage.getItem('token');

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new headers.
    const modifiedReq = this.token ? req.clone({
      headers: req.headers.set('x-auth-token', this.token)
    }) : req;

    // Send the newly created request with the headers
    return next.handle(modifiedReq);
  }
}
