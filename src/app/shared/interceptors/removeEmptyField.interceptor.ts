import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';

@Injectable()
export class RemoveEmptyFieldInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      body: this.removeEmptyFields(req.body)
    })
    return next.handle(newReq)

  }

  removeEmptyFields(body: Params) {
    if (!body) {
      return body
    }
    const newBody = {}
    Object.keys(body)
      .forEach(key => body[key] ? newBody[key] = body[key] : '')
    return newBody
  }
}
