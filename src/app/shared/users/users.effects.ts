import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from './users.service';
import { UserActions } from './users.actions';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';


@Injectable()
export class UsersEffects {

  fetchingUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUsers),
    switchMap(() => this.usersService.getAllUsers()),
    map(users => UserActions.fetchedUsers({ users }))
  ))

  fetchingUserById$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUserById),
    switchMap(({ id }) => this.usersService.getById(id)),
    map((user) => UserActions.fetchedUserById({ user }))
  ))

  subscriptionUserStatus$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.userStatusChangedWSSubscription),
    switchMap(() => this.usersService.userStatusSubscription()),
    distinctUntilChanged(),
    map((user) => UserActions.userStatusChanged({ user }))
  ))

  constructor(private actions$: Actions, private usersService: UsersService) {
  }

}
