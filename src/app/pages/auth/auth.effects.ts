import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from './services/auth.service';
import { AuthActions } from './auth.actions';
import {
  catchError, delay,
  distinct,
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
import { Observable, of, OperatorFunction } from 'rxjs';
import { LocalStorageService } from '../../shared/local-storage.service';
import { AccessToken } from './models/auth.models';
import { isTokenExpired } from '../../../utils/utils';
import { HttpErrorResponse } from '@angular/common/http';
import { log } from 'util';


@Injectable()
export class AuthEffects {
  fetchTokenByCredentials$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.accessTokenLoginPageRequest),
    mergeMap(({ login, password }) => this.authService.getAccessTokenByCredentials(login, password)
      .pipe(
        tap(res => this.jwtTokenService.setToken(res)),
        map(res => AuthActions.accessTokenReceived({ ...res })),
        catchError(e => of(AuthActions.loginFailure({ error: e })))
      ))
    )
  )

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

  getUserDataByToken$ = () => {
    return this.store.pipe(
      select(AuthSelectors.token)
    ).pipe(
      filter((token) => !!token),
      first(),
      map(({ token }) => AuthActions.userInformationRequest({ token }))
    )
  }


  loginUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    tap(cred => this.store.dispatch(AuthActions.accessTokenLoginPageRequest(cred))),
    switchMap(this.getUserDataByToken$)
  ))

  loginUserByCachedToken$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.authByCachedToken),
    tap(() => this.store.dispatch(AuthActions.getAuthToken())),
    switchMap(this.getUserDataByToken$))
  )

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
    distinct((token: AccessToken) => token?.token),
    map((token: AccessToken) => {
      if (token) {
        return AuthActions.setAuthToken({ token })
      }
      this.store.dispatch(AuthActions.authFailure({ error: 'no cached token' }))
      return AuthActions.unAuthorizeAccess()
    })
  ))


  constructor(private actions$: Actions, private authService: AuthService,
              private store: Store<AuthState>,
              private jwtTokenService: JWTTokenService,
              private router: Router,
              private localStorageService: LocalStorageService) {
  }

}
