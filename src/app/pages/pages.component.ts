import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { AuthActions } from './auth/auth.actions';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, startWith, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ifError } from 'assert';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <div class="row">
        <div class="col-md-12" [ngClass]="getClasses()">
          <router-outlet></router-outlet>
        </div>
        <div *ngIf="!isAuth" class="col-lg-4 col-xxxl-3">
          <div class="sticky-top">
            <ngx-list-of-users></ngx-list-of-users>
          </div>
        </div>
      </div>
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
      startWith(this.router.url),
      tap(e => this.isAuth = this.router.url.includes('auth'))
    ).subscribe()
    if (!this.isAuth) {
      this.store.dispatch(AuthActions.authByCachedToken())
    }

  }

  getClasses() {
    return this.isAuth ? 'col-lg-12 col-xxxl-12' : 'col-lg-8 col-xxxl-9'
  }

}
