import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { AuthActions } from './auth/auth.actions';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ifError } from 'assert';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
      <ngx-list-of-users *ngIf="!isAuth"></ngx-list-of-users>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu = MENU_ITEMS;
  isAuth: boolean
  constructor(private store: Store<AppState>,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private  location: Location) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      tap(e => console.log(this.isAuth)),
      // tap(e => this.isAuth = e.url.includes('auth'))
    ).subscribe()
    if (!this.isAuth) {
      this.store.dispatch(AuthActions.authByCachedToken())
    }

  }

}
