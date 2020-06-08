import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from './services/auth.service';
import { AuthActions } from './auth.actions';
import { distinct, filter, map, mergeMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { CdkStep } from '@angular/cdk/stepper';
import { AuthSelectors } from './auth.selectors';
import { JWTTokenService } from '../../shared/jwttoken.service';


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

  // getTokenFromLocalStorage$ = createEffect(() => this.actions$.pipe(
  //   ofType(AuthActions.)
  // ))

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

  constructor(private actions$: Actions, private authService: AuthService,
              private store: Store<AuthState>,
              private jwtTokenService: JWTTokenService) {
  }

}
