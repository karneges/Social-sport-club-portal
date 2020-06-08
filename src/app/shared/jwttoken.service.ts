import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { delay, distinct, switchMap } from 'rxjs/operators';
import { AccessToken, AccessTokenResponse } from '../pages/auth/models/auth.models';
import { AuthService } from '../pages/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {
  isTokenFetching = false

  constructor(private localStorageService: LocalStorageService, private authService: AuthService) {
  }

  setToken(value: AccessToken) {
    this.localStorageService.addItem('token', value)
  }

  getToken(): Observable<AccessToken> {
    return new Observable<AccessToken>(subscriber => {
      const token: AccessToken = this.localStorageService.getField('token') as AccessToken
      const tokenExpireDate = new Date(token.expiresIn).getTime()
      const dateNow = new Date().getTime()
      if (token) {
        subscriber.next(token)
        subscriber.complete()
      } else {
        subscriber.error('No Cached Token')
      }
    }).pipe(
      distinct(({ token }) => token)
    )
  }

  // getToken(): Observable<AccessToken> {
  //   const token$ = new Subject()
  //   const token: AccessToken = this.localStorageService.getField('token') as AccessToken
  //   const tokenExpireDate = new Date(token.expiresIn).getTime()
  //   const dateNow = new Date().getTime()
  //   if (dateNow > tokenExpireDate)
  //
  //     if (token) {
  //       subscriber.next(token)
  //       subscriber.complete()
  //     } else {
  //       subscriber.error('No Cached Token')
  //     }
  //
  // }


}


// getToken => token ? token :
