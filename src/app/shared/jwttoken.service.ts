import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { AccessToken, AccessTokenResponse } from '../pages/auth/models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {
  token$: BehaviorSubject<AccessToken>

  constructor(private localStorageService: LocalStorageService, private http: HttpClient) {
  }

  setToken(value: AccessToken) {
    this.localStorageService.addItem('token', value)
  }

  getToken(): Observable<AccessToken> {
    return new Observable<AccessToken>(subscriber => {
      const token: AccessToken = this.localStorageService.getField('token') as AccessToken
      if (token) {
        subscriber.next(token)
        subscriber.complete()
      } else {
        subscriber.error('No Cached Token')
      }
    })
  }


}


// getToken => token ? token :
