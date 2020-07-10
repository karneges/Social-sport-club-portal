import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AccessToken, AccessTokenResponse } from '../models/auth.models';
import { User } from '../../../models/user.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { forEachComment } from 'tslint';
import { RegisterModelResponse } from '../../../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = `${ environment.API_BASE_URL }/auth`

  constructor(private http: HttpClient) {
  }

  getAccessTokenByCredentials(credentials: { email: string, password?: string, gId?: string }): Observable<AccessToken> {
    const url = `${ this.rootUrl }/login`
    return this.http.put<AccessTokenResponse>(url, credentials).pipe(
      map(res => {
        delete res.success
        return res
      })
    )
  }


  registerUserAndGetAccessToken(credentials: RegisterModelResponse): Observable<AccessToken> {
    const url = `${ this.rootUrl }/register`
    return this.http.post<AccessTokenResponse>(url, credentials).pipe(
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

  getNewAccessTokenByRefreshToken(refreshToken: string): Observable<AccessToken> {
    return this.http.get<AccessTokenResponse>(`${ this.rootUrl }/token`,
      { headers: { 'Authorization': `Bearer ${ refreshToken }` } }).pipe(
      map(res => {
        const { success, ...token } = res
        return token
      })
    )
  }


}
