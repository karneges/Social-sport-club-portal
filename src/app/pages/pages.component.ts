import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { select, Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { AuthActions } from './auth/auth.actions';
import { Router } from '@angular/router';
import { delay, filter, startWith, tap } from 'rxjs/operators';
import { UserActions } from '../shared/users/users.actions';
import { MessageActions } from '../shared/messages/messages.actions';
import { MessagesNotificationService } from '../shared/notifications/messages/messages.notification.service';
import { Observable } from 'rxjs';
import { AuthSelectors } from './auth/auth.selectors';
import { PagesService } from './pages.service';
import { ErrorsNotificationService } from '../shared/notifications/errors/errors.notification.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <div class="container">
        <div class="row">
          <div class="col-md-12" [ngClass]="columnClass">
            <router-outlet></router-outlet>
          </div>
          <div *ngIf="(isUnAuth$ | async) === false" class="col-lg-4 col-xxxl-3">
            <div class="sticky-top">
              <ngx-list-of-users>
                <ngx-training-user-fetures-list *ngIf="isMyTrainingPage"></ngx-training-user-fetures-list>
              </ngx-list-of-users>
            </div>
          </div>
        </div>
      </div>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  isUnAuth$: Observable<boolean>
  menu = MENU_ITEMS;
  isAuthPage: boolean
  isMyTrainingPage: boolean
  columnClass: string


  constructor(private store: Store<AppState>,
              private router: Router,
              private messagesNotificationService: MessagesNotificationService,
              private pagesService: PagesService,
              private errorsNotificationService: ErrorsNotificationService) {
  }

  ngOnInit(): void {
    this.initialWsSubscription()
    this.routerEventsSubscription()
    this.globalSubscriptions()

    // Any first page except auth pages should try to regain access by token.
    if (!this.isAuthPage) {
      this.store.dispatch(AuthActions.authByCachedToken())
    }
    this.isUnAuth$ = this.store.pipe(
      select(AuthSelectors.isUnAuthAccess),
      filter((r) => r !== undefined),
      delay(0),
      tap((isUnAuth) => this.columnClass = isUnAuth ? 'col-lg-12 col-xxxl-12' : 'col-lg-8 col-xxxl-9')
    )
    // resolve auth/unAuth actions
    this.pagesService.runAuthResolver(this.isUnAuth$)
  }

  routerEventsSubscription() {
    this.router.events.pipe(
      startWith(this.router.url),
      tap(e => this.isAuthPage = this.router.url.includes('auth')),
      tap(e => this.isMyTrainingPage = this.router.url.includes('my-training'))
    ).subscribe()
  }

  // When app start this method init all static WS subscription
  initialWsSubscription() {
    this.store.dispatch(UserActions.userStatusChangedWSSubscription())
    this.store.dispatch(MessageActions.openWsMessageSubscription())
  }

  private globalSubscriptions() {
    this.messagesNotificationService.messageNotificationSubscription()
    this.errorsNotificationService.authErrorNotificationSubscription()
  }

}
