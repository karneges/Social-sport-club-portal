import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthActions } from '../auth.actions';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor(private store: Store<AuthState>, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  submitForm() {
    this.store.dispatch(AuthActions.login(this.loginForm.value))
  }
}
