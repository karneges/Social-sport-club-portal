import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { AuthActions } from './auth/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
      <ngx-list-of-users></ngx-list-of-users>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu = MENU_ITEMS;

  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngOnInit(): void {
    if (!this.router.url.includes('login')) {
      this.store.dispatch(AuthActions.authByCachedToken())
    }

  }

}
