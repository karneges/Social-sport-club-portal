import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import { AuthActions } from './auth.actions';
import { state } from '@angular/animations';


export const authFeatureKey = 'auth';

export interface AuthState {
  user: User
  loadingUser: boolean
  token: {
    token: string,
    refreshToken
    expiresIn: string
  }
  fetchingToken: boolean
}

export const initialState: AuthState = {
  user: undefined,
  loadingUser: false,
  token: undefined,
  fetchingToken: undefined
};


export const reducer = createReducer(
  initialState,
  on(AuthActions.login, (state, action) => {
    return {
      ...state,
      loadingUser: true,
      fetchingToken: true
    }
  }),
  on(AuthActions.accessTokenReceived, ((state, action) => {
    return {
      ...state,
      token: { ...action },
      fetchingToken: false
    }
  })),
  on(AuthActions.userInformationReceived, ((state, action) => {
    return {
      ...state,
      user: action.user,
      loadingUser: false
    }
  })),
  on(AuthActions.setAuthToken, ((state, action) => {
    return {
      ...state,
      token: { ...action },
      fetchingToken: false
    }
  })),
  on(AuthActions.removeAuthToken, ((state, action) => {

    return {
      ...state,
      token: null,
    }
  })),
  on(AuthActions.authTokenFetching, ((state, action) => {
    return {
      ...state,
      token: null,
      fetchingToken: true
    }
  }))
);

