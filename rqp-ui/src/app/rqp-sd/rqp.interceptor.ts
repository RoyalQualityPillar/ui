import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class RqpInterceptor implements HttpInterceptor {

  constructor(private cookieService:CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.cookieService.get('token');
    if (request.url.includes('authenticate')) {
      return next.handle(request); 
    }
    const authRequest=request.clone({
      headers:request.headers.set("Authorization","Bearer "+token)
    })
    return next.handle(authRequest);
  }
}
