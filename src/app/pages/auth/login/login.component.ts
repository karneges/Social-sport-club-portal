import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../auth.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthActions } from '../auth.actions';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { fromPromise } from 'rxjs-compat/observable/fromPromise';
import { filter, first, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthSelectors } from '../auth.selectors';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authForm: FormGroup
  isSignUp: boolean

  constructor(private store: Store<AuthState>,
              private fb: FormBuilder,
              private socialAuthService: SocialAuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.changeFormModeWithUrl()
    this.store.pipe(
      select(AuthSelectors.user),
      first(user => !!user?._id),
      tap((r) => {
        this.router.navigateByUrl('general')
      })
    ).subscribe()
  }

  changeFormModeWithUrl() {
    this.activatedRoute.url.pipe(
      tap(params => {
        this.isSignUp = params[0].path === 'register'
        if (this.isSignUp) {
          this.createRegisterForm()
        } else {
          this.createLoginForm()
        }
      }),
      first(params => params[0].path !== 'register' && params[0].path !== 'login')
    ).subscribe()
  }

  createLoginForm() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  createRegisterForm() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]]
    })
  }

  submitForm() {
    if (this.isSignUp) {
      return this.store.dispatch(AuthActions.register(this.authForm.value))
    }
    this.store.dispatch(AuthActions.login(this.authForm.value))
  }

  signInWithGoogle(): void {
    fromPromise(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)).pipe(
      tap(({ email, id }) => this.store.dispatch(AuthActions.login({ email, gId: id })))
    ).subscribe()
  }

  registerWithGoogle(): void {
    fromPromise(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)).pipe(
      tap(({ name, email, id: gId, photoUrl }) => {
        this.store.dispatch(AuthActions.register({ name, email, gId, photoUrl }))
      })
    ).subscribe()
  }

  // name: string,
  // email: string,
  // password?: string,
  // gId?: string
  // role?: 'admin' | 'trainer' | 'user',
  // photoUrl?: string

}
