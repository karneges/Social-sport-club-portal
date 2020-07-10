import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { merge, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../../pages/auth/auth.reducer';
import { AuthActions } from '../../pages/auth/auth.actions';
import { AuthSelectors } from '../../pages/auth/auth.selectors';
import { filter, first, pluck, switchMap } from 'rxjs/operators';
import { isTokenExpired } from '../../../utils/utils';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<AuthState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('token') || req.url.includes('login') || req.url.includes('register')) {
      return next.handle(req)
    }

    this.store.dispatch(AuthActions.getAuthToken())
    const addAuthHeader$ = this.store.pipe(
      select(AuthSelectors.token),
      filter((token) => !!token && !isTokenExpired(token.expiresIn)),
      pluck('token')
    )
    const withoutAuthHeader$ = this.store.pipe(
      select(AuthSelectors.isUnAuthAccess),
      first(is => is)
    )

    return merge(addAuthHeader$, withoutAuthHeader$).pipe(
      first(),
      switchMap((value) => {
        if (typeof value === 'string') {
          const newReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${ value }`)
          })
          return next.handle(newReq)
        }
        return next.handle(req)
      })
    )
  }
}
