import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { select, Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { AuthActions } from './auth/auth.actions';
import { Router } from '@angular/router';
import { startWith, tap } from 'rxjs/operators';
import { UserActions } from '../shared/users/users.actions';
import { MessageActions } from '../shared/messages/messages.actions';
import { NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <div class="container">
        <div class="row">
          <div class="col-md-12" [ngClass]="getClasses()">
            <router-outlet></router-outlet>
          </div>
          <div *ngIf="!isAuthPage" class="col-lg-4 col-xxxl-3">
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

  menu = MENU_ITEMS;
  isAuthPage: boolean

  constructor(private store: Store<AppState>,
              private router: Router,
              private toastrService: NbToastrService,
              private updates$: Actions) {
  }

  ngOnInit(): void {
    this.initialWsSubscription()
    this.routerEventsSubscription()
    this.globalSubscription()
    // Any first page except auth pages should try to regain access by token.
    if (!this.isAuthPage) {
      this.store.dispatch(AuthActions.authByCachedToken())
    }
  }

  routerEventsSubscription() {
    this.router.events.pipe(
      startWith(this.router.url),
      tap(e => this.isAuthPage = this.router.url.includes('auth'))
    ).subscribe()
  }

  getClasses() {
    return this.isAuthPage ? 'col-lg-12 col-xxxl-12' : 'col-lg-8 col-xxxl-9'
  }

  // When app start this method init all static WS subscription
  initialWsSubscription() {
    this.store.dispatch(UserActions.userStatusChangedWSSubscription())
    this.store.dispatch(MessageActions.openWsMessageSubscription())
  }

  private globalSubscription() {
    // this.updates$.pipe(
    //   ofType(MessageActions.receivedNewMessage),
    //   tap(({ message }) => {
    //     const { text, sender } = message[0]
    //     this.toastrService.show(
    //       `New Message from ${ sender.name }`,
    //       `${ text }`, { position: NbGlobalLogicalPosition.BOTTOM_END, duration: 3000 })
    //   })
    // ).subscribe()
  }
}
