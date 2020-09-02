import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { // This will intercept every HTTP call made from the app
    const modifiedRequest = req.clone({
      headers: req.headers.append('X-RapidAPI-Key', 'b16746ebc03432256bce562b1766ccc3')
    });
    return next.handle(modifiedRequest);
  }
}
