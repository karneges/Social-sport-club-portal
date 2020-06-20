import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from './services/auth.service';
import { AuthActions } from './auth.actions';
import {
  catchError, delay,
  distinctUntilChanged,
  filter,
  first,
  map,
  mergeMap,
  switchMap,
  tap
} from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { AuthSelectors } from './auth.selectors';
import { JWTTokenService } from '../../shared/jwttoken.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LocalStorageService } from '../../shared/local-storage.service';
import { AccessToken } from './models/auth.models';
import { isTokenExpired } from '../../../utils/utils';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class AuthEffects {
  /*
   This is first step in login without token
   Fetching token
  */
  fetchTokenByCredentials$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.accessTokenLoginPageRequest),
    mergeMap(({ email, password = '', gId = '' }) => this.authService.getAccessTokenByCredentials({
      email,
      password,
      gId
    })
      .pipe(
        tap(res => this.jwtTokenService.setToken(res)),
        map(res => AuthActions.accessTokenReceived({ ...res })),
        catchError(e => of(AuthActions.loginFailure({ error: e })))
      ))
    )
  )

  /*
   This is first step in register
   Fetching token
  */
  fetchTokenByNewUserCredentials$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.accessTokenRegisterPageRequest),
    mergeMap((credential) => this.authService
      .registerUserAndGetAccessToken(credential)
      .pipe(
        tap(res => this.jwtTokenService.setToken(res)),
        map(res => AuthActions.accessTokenReceived({ ...res })),
        catchError(e => of(AuthActions.loginFailure({ error: e })))
      ))
    )
  )

  // Second auth step fetching user info with access token
  fetchUserInformationByToken$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.userInformationRequest),
    mergeMap(({ token }) => this.authService.getUserInformation(token)
      .pipe(
        map(user => AuthActions.userInformationReceived({ user }),
          catchError(e => of(AuthActions.loginFailure({ error: e })))
        )
      ))
    )
  )

  // Util method just send only valid token from user information end point
  getUserDataByToken$ = () => {
    return this.store.pipe(
      select(AuthSelectors.token)
    ).pipe(
      filter((token) => !!token),
      first(),
      map(({ token }) => AuthActions.userInformationRequest({ token }))
    )
  }

  /*
   Higher order method ,this place of start login
   1) Run getting access token
   2) Run getting user data with valid token
  */
  loginUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    tap(cred => this.store.dispatch(AuthActions.accessTokenLoginPageRequest(cred))),
    switchMap(this.getUserDataByToken$)
  ))
  /*
   Higher order method ,this place of start register
   1) Run getting access token
   2) Run getting user data with valid token
  */
  registerUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.register),
    tap(cred => this.store.dispatch(AuthActions.accessTokenRegisterPageRequest(cred))),
    switchMap(this.getUserDataByToken$)
  ))
  /*
   Higher order method ,this place of start auth with cached token
   1) Check, if token has
   2) Run getting user data with valid token
  */
  loginUserByCachedToken$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.authByCachedToken),
    tap(() => this.store.dispatch(AuthActions.getAuthToken())),
    switchMap(this.getUserDataByToken$))
  )

  /*
   Util method of management tokens
   If token is live return token
   Else try get new token with refresh token
   If have no token or, an error was received
   Switch app in unAuthAccess mode
  */
  getToken$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.getAuthToken),
    switchMap(() => this.store.pipe(select(AuthSelectors.fetchingToken))),
    filter((isfetching => !isfetching)),
    switchMap(() => {
      const token = this.localStorageService.getField('token') as AccessToken
      if (isTokenExpired(token?.expiresIn)) {
        this.localStorageService.removeField('token')
        this.store.dispatch(AuthActions.removeAuthToken())
        this.store.dispatch(AuthActions.authTokenFetching())
        const { refreshToken } = token
        return this.authService.getNewAccessTokenByRefreshToken(refreshToken).pipe(
          tap(res => {
            this.localStorageService.addItem('token', res)
          }),
          delay(2000),
          catchError((err: HttpErrorResponse) => {
            this.store.dispatch(AuthActions.authFailure({ error: `http error: ${ err.message }` }))
            return of([])
          })
        )
      }
      return of(token)
    }),
    distinctUntilChanged((oldToken: AccessToken, newToken: AccessToken) => oldToken?.token === newToken?.token),
    map((token: AccessToken) => {
      if (token) {
        return AuthActions.setAuthToken({ token })
      }
      this.store.dispatch(AuthActions.authFailure({ error: 'no cached token' }))
      return AuthActions.unAuthorizeAccess()
    })
  ))

  /*
 Delete token
 And switch app in unAuthAccess mode
*/
  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => {
      this.localStorageService.removeField('token')
      this.store.dispatch(AuthActions.getAuthToken())
    })
  ), { dispatch: false })


  constructor(private actions$: Actions, private authService: AuthService,
              private store: Store<AuthState>,
              private jwtTokenService: JWTTokenService,
              private router: Router,
              private localStorageService: LocalStorageService) {
  }

}

