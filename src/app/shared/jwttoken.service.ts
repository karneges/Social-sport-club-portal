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
  token$: BehaviorSubject<string>

  constructor(private localStorageService: LocalStorageService, private http: HttpClient) {
  }

  setToken(value: AccessToken ) {
    this.localStorageService.addItem('token', value)
  }

  getToken(): Observable<string> {
    return this.token$.asObservable().pipe(
      switchMap(token => {
        if (token) {
          return token
        }
        return this.http.get<string>('url').pipe()
      })
    )
  }


}


// getToken => token ? token :
