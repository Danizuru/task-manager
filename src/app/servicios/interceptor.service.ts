import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  requestOption:any = {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // console.log("intercepto")
    this.requestOption = {
      headers: new HttpHeaders({
        //"Content-Type":"application/json;charset=UTF-8"
      }), withCredentials:true
    }

    const reqClone = req.clone(this.requestOption)
    return next.handle(reqClone)

  }

}