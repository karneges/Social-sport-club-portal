import { Injectable } from '@angular/core';
import { MessageActions } from '../shared/messages/messages.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { UserActions } from '../shared/users/users.actions';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private store: Store) {
  }

  private initAuthenticationActions() {
    this.store.dispatch(MessageActions.loadNoReadMessages())
    this.store.dispatch(UserActions.loadUsers())
  }

  private initUnAuthenticationActions() {

  }

  public runAuthResolver(isUnAuth: Observable<boolean>) {
    isUnAuth.pipe(
      distinctUntilChanged(),
      tap((isUnAuth) => {
        if (isUnAuth) {
          this.initUnAuthenticationActions()
        } else {
          this.initAuthenticationActions()
        }
      })
    ).subscribe()
  }
}
