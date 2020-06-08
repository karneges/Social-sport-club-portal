import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../../pages/auth/auth.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthActions } from '../../pages/auth/auth.actions';
import { AuthSelectors } from '../../pages/auth/auth.selectors';
import { catchError, distinct, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<AuthState>,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('token') && req.url.includes('login') && req.url.includes('register')) {
      return next.handle(req)
    }

    this.store.dispatch(AuthActions.getAuthToken())
    return this.store.pipe(
      select(AuthSelectors.token)
    ).pipe(
      filter(token => !!token),
      take(1),
      switchMap(({ token }) => {
        const newReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${ token }`)
        })
        return next.handle(newReq)
      })
    )
  }
}
