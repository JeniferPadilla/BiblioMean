import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private _userService:UserService) { }
  intercept(req:any, next:any){
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this._userService.getToken(),
      },
    });
    return next.handle(tokenReq);
  }
}
