import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AccessToken, AccessTokenResponse } from '../models/auth.models';
import { User } from '../../../models/user.model';
import { delay, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = `${ environment.API_BASE_URL }/auth`

  constructor(private http: HttpClient) {
  }

  getAccessTokenByCredentials(login: string, password: string): Observable<AccessToken> {
    return this.http.put<AccessTokenResponse>(`${ this.rootUrl }/login`, { login, password }).pipe(
      map(res => {
        delete res.success
        return res
      })
    )
  }

  getUserInformation(token: string) {
    return this.http.get<{ success: boolean, user: User }>(`${ this.rootUrl }/me`,
      { headers: { 'Authorization': `Bearer ${ token }` } }).pipe(
      map(res => {
        return res.user
      })
    )
  }

  getNewAccessTokenByRefreshToken(refreshToken: string) {
    return this.http.get<AccessTokenResponse>(`${ this.rootUrl }/token`)
  }


}
