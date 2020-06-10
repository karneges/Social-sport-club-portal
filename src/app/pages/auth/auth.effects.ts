import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from './services/auth.service';
import { AuthActions } from './auth.actions';
import {
  catchError,
  delay,
  distinct,
  distinctUntilChanged,
  filter,
  first,
  map,
  mergeMap,
  switchMap,
  take,
  tap
} from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { AuthSelectors } from './auth.selectors';
import { JWTTokenService } from '../../shared/jwttoken.service';
import { Router } from '@angular/router';
import { EMPTY, of, throwError } from 'rxjs';
import { LocalStorageService } from '../../shared/local-storage.service';
import { AccessToken } from './models/auth.models';
import { isTokenExpired } from '../../../utils/utils';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class AuthEffects {
  callCounter = 0
  fetchTokenByCredentials$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.accessTokenLoginPageRequest),
    mergeMap(({ login, password }) => this.authService.getAccessTokenByCredentials(login, password)
      .pipe(
        tap(res => this.jwtTokenService.setToken(res)),
        map(res => AuthActions.accessTokenReceived({ ...res })),
      ))
    )
  )

  fetchUserInformationByToken$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.userInformationRequest),
    mergeMap(({ token }) => this.authService.getUserInformation(token)
      .pipe(
        map(user => AuthActions.userInformationReceived({ user })
        )
      ))
    )
  )

  loginUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    tap(cred => this.store.dispatch(AuthActions.accessTokenLoginPageRequest(cred))),
    mergeMap(() => this.store.pipe(
      select(AuthSelectors.token)
    )),
    filter((token) => !!token),
    first(),
    distinct((token) => token.token),
    map(({ token }) => AuthActions.userInformationRequest({ token }))
    )
  )

  loginUserByCachedToken$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.authByCachedToken),
    tap(() => this.store.dispatch(AuthActions.getAuthToken())),
    switchMap(() => this.store.pipe(
      select(AuthSelectors.token)
    )),
    filter(token => !!token?.token),
    first(),
    distinct((token) => token.token),
    map(({ token }) => {
      return AuthActions.userInformationRequest({ token })
    })
    )
  )

  // getToken$ = createEffect(() => this.actions$.pipe(
  //   ofType(AuthActions.getAuthToken),
  //
  //   switchMap(() => this.jwtTokenService.tokenFetching$),
  //   filter(fetching => !fetching),
  //   switchMap(() => this.jwtTokenService.getToken()),
  //   tap((r) => {
  //     debugger
  //   }),
  //   filter((token) => !!token),
  //   distinct(({ token }) => token),
  //   map((token) => AuthActions.setAuthToken(token)),
  //   catchError(err => {
  //     this.router.navigate(['/pages/login'])
  //     return EMPTY
  //   })
  // ))

  getToken$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.getAuthToken),
    switchMap(() => {
      return this.store.pipe(
        select(AuthSelectors.fetchingToken),
      )
    }),
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
          catchError((err: HttpErrorResponse) => of(AuthActions.authFailure({ error: `http error: ${ err.message }` })))
        )
      }
      return of(token)
    }),
    distinct((token: AccessToken) => token?.token),
    map((token: AccessToken) => {
      if (token) {
        return AuthActions.setAuthToken(token)
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
