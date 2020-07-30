import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import { AuthActions } from './auth.actions';
import { HttpErrorResponse } from '@angular/common/http';


export const authFeatureKey = 'auth';

export interface AuthState {
  user: User
  loadingUser: boolean
  userUpdating: boolean
  token: {
    token: string,
    refreshToken
    expiresIn: string
  }
  fetchingToken: boolean,
  error: HttpErrorResponse | string,
  unAuthAccess: boolean,
  webSocketAuthConnect: boolean
}

export const initialState: AuthState = {
  user: undefined,
  loadingUser: false,
  userUpdating: false,
  token: undefined,
  fetchingToken: false,
  error: undefined,
  unAuthAccess: undefined,
  webSocketAuthConnect: undefined
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
      loadingUser: false,
      unAuthAccess: false
    }
  })),
  on(AuthActions.userInformationUpdateRequest, (state, action) => {
    return {
      ...state,
      userUpdating: true
    }
  }),
  on(AuthActions.updatedUserInformationReceived, (state, action) => {
    return {
      ...state,
      userUpdating: false,
      user: { ...state.user, ...action.user }
    }
  }),
  on(AuthActions.setAuthToken, ((state, action) => {
    return {
      ...state,
      token: action.token,
      fetchingToken: false
    }
  })),
  on(AuthActions.removeAuthToken, ((state, action) => {
    return {
      ...state,
      token: null
    }
  })),
  on(AuthActions.authTokenFetching, ((state, action) => {
    return {
      ...state,
      token: null,
      fetchingToken: true
    }
  })),
  on(AuthActions.authFailure, ((state, action) => {
    return {
      ...state,
      error: action.error,
      unAuthAccess: true,
      webSocketAuthConnect: false,
      user: undefined,
      token: undefined
    }
  })),
  on(AuthActions.loginFailure, ((state, action) => {
    return {
      ...state,
      error: action.error.error
    }
  })),
  on(AuthActions.authenticationSocketReceived, ((state) => {
    return {
      ...state,
      webSocketAuthConnect: true
    }
  })),
  on(AuthActions.unAuthorizeAccess, (state, action) => {
    return {
      ...initialState,
      unAuthAccess: true
    }
  })
);

