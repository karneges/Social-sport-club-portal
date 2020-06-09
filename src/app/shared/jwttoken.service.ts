import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, EMPTY, Observable, of, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { delay, distinct, switchMap, tap } from 'rxjs/operators';
import { AccessToken, AccessTokenResponse } from '../pages/auth/models/auth.models';
import { AuthService } from '../pages/auth/services/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../pages/auth/auth.reducer';
import { AuthActions } from '../pages/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {
  tokenFetching$ = new BehaviorSubject(false)
  count = 0

  constructor(private localStorageService: LocalStorageService, private authService: AuthService, private store: Store<AuthState>) {
  }

  setToken(value: AccessToken) {
    this.localStorageService.addItem('token', value)
  }

  //
  // getToken(): Observable<AccessToken> {
  //   return new Observable<AccessToken>(subscriber => {
  //     const token: AccessToken = this.localStorageService.getField('token') as AccessToken
  //     const tokenExpireDate = new Date(token.expiresIn).getTime()
  //     const dateNow = new Date().getTime()
  //     if (token) {
  //       subscriber.next(token)
  //       subscriber.complete()
  //     } else {
  //       subscriber.error('No Cached Token')
  //     }
  //   }).pipe(
  //     distinct(({ token }) => token)
  //   )
  // }

  getToken(): Observable<AccessToken> {
    this.count += 1
    const token = this.localStorageService.getField('token') as AccessToken
    debugger
    const tokenExpireDate = new Date(token.expiresIn).getTime()
    console.log(`${ new Date(tokenExpireDate) }`, 'torkn exp date')
    const dateNow = new Date().getTime()
    console.log(`${ new Date(dateNow) }`, 'dateNow')
    if (dateNow > tokenExpireDate) {
      this.store.dispatch(AuthActions.removeAuthToken())
      this.tokenFetching$.next(true)

      const { refreshToken } = token

      this.localStorageService.removeField('token')
      debugger
      return this.authService.getNewAccessTokenByRefreshToken(refreshToken).pipe(
        tap((res) => {
          this.setToken(res)
          this.tokenFetching$.next(false)
          debugger
        })
      )
    } else if (token) {
      debugger
      return of(token)
    } else {
      return throwError('no token')
    }

  }


}


// getToken => token ? token :
