import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from './services/auth.service';
import { AuthActions } from './auth.actions';
import { catchError, distinct, filter, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { AuthSelectors } from './auth.selectors';
import { JWTTokenService } from '../../shared/jwttoken.service';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';


@Injectable()
export class AuthEffects {

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
    distinct(),
    map(({ token }) => AuthActions.userInformationRequest({ token }))
    )
  )

  loginUserByCachedToken$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.authByCachedToken),
    tap(() => this.store.dispatch(AuthActions.getAuthToken())),
    switchMap(() => this.store.pipe(
      select(AuthSelectors.token)
    )),
    filter(token => !!token),
    take(1),
    map(({ token }) => {
      if (token) {
        return AuthActions.userInformationRequest({ token })
      }
    })
    )
  )

  getToken$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.getAuthToken),
    switchMap(() => this.jwtTokenService.getToken()),
    distinct(({token}) => token),
    map((token) => AuthActions.setAuthToken(token)),
    catchError(err => {
      this.router.navigate(['/pages/login'])
      return EMPTY
    })
  ))

  constructor(private actions$: Actions, private authService: AuthService,
              private store: Store<AuthState>,
              private jwtTokenService: JWTTokenService,
              private router: Router) {
  }

}