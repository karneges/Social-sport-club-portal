import { Component, OnInit, QueryList } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { select, Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { AuthActions } from './auth/auth.actions';
import { Router } from '@angular/router';
import { delay, first, map, startWith, tap } from 'rxjs/operators';
import { UserActions } from '../shared/users/users.actions';
import { MessageActions } from '../shared/messages/messages.actions';
import { Actions, ofType } from '@ngrx/effects';
import { BaseMessageEntity } from '../shared/messages/models/message.model';
import { ToastrService } from 'ngx-toastr';
import { MessagesNotificationService } from '../shared/notifications/messages.notification.service';
import { Observable } from 'rxjs';
import { AuthSelectors } from './auth/auth.selectors';

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
          <div *ngIf="!(isUnAuth$ | async)" class="col-lg-4 col-xxxl-3">
            <div class="sticky-top">
              <ngx-list-of-users></ngx-list-of-users>
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
  columnClass: string

  constructor(private store: Store<AppState>,
              private router: Router,
              private updates$: Actions,
              private toastr: ToastrService,
              private messagesNotificationService: MessagesNotificationService) {
  }

  ngOnInit(): void {
    this.initialWsSubscription()
    this.routerEventsSubscription()
    this.globalSubscription()
    this.store.dispatch(MessageActions.loadNoReadMessages())
    // Any first page except auth pages should try to regain access by token.
    if (!this.isAuthPage) {
      this.store.dispatch(AuthActions.authByCachedToken())
    }
    this.isUnAuth$ = this.store.pipe(
      select(AuthSelectors.isUnAuthAccess),
      delay(0),
      tap((isUnAuth) => this.columnClass = isUnAuth ? 'col-lg-12 col-xxxl-12' : 'col-lg-8 col-xxxl-9')
    )
  }

  routerEventsSubscription() {
    this.router.events.pipe(
      startWith(this.router.url),
      tap(e => this.isAuthPage = this.router.url.includes('auth'))
    ).subscribe()
  }

  // get classes() {
  //   console.log('getClass')
  //   return this.isUnAuth$.pipe(
  //     map((isUnAuth) => isUnAuth ? 'col-lg-12 col-xxxl-12' : 'col-lg-8 col-xxxl-9')
  //   )
  //   // return this.isAuthPage ? 'col-lg-12 col-xxxl-12' : 'col-lg-8 col-xxxl-9'
  // }

  // When app start this method init all static WS subscription
  initialWsSubscription() {
    this.store.dispatch(UserActions.userStatusChangedWSSubscription())
    this.store.dispatch(MessageActions.openWsMessageSubscription())
  }

  private globalSubscription() {
    this.updates$.pipe(
      ofType(MessageActions.receivedNewMessage),
      tap(({ messagesEntity }) => {
          const { message: { text }, sender } = BaseMessageEntity.convertOneMessageEntityToObject(messagesEntity)
          this.toastr.info(text, `from ${ sender.name }`, { timeOut: 10000 }).onTap.pipe(
            tap(() => this.messagesNotificationService.onMessageNotificationClick(sender._id)),
            first()
          ).subscribe()
        }
      )
    ).subscribe()
  }
}
