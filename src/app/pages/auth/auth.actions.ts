import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';
import { AccessToken } from './models/auth.models';
import { RegisterModelRequest, RegisterModelResponse } from '../../models/register.model';
import { LoginModel } from '../../models/login.model';
import { HttpErrorResponse } from '@angular/common/http';


const login = createAction(
  '[Login Page] User Login',
  props<LoginModel>()
)

const register = createAction(
  '[Login Page] User Register',
  props<RegisterModelResponse>()
)

const accessTokenLoginPageRequest = createAction(
  '[Login Page] Access Token Login Page Request',
  props<LoginModel>()
)
const accessTokenRegisterPageRequest = createAction(
  '[Register Page] Access Token Register Page Request',
  props<RegisterModelRequest>()
)
const accessTokenRequest = createAction(
  '[Dashboard] Access Token Login Page Request',
  props<{ token: string }>()
)

const accessTokenReceived = createAction(
  '[Login Page | Dashboard] Access Token Received',
  props<{ token: string, refreshToken: string, expiresIn: string }>()
)


const authByCachedToken = createAction(
  '[Dashboard] Auth By Cached Token'
)

const getAuthToken = createAction(
  '[Dashboard] Get Auth Token'
)

const setAuthToken = createAction(
  '[Dashboard] Set Auth Token',
  props<{ token: AccessToken }>()
)

const removeAuthToken = createAction(
  '[Dashboard] Remove Auth Token'
)

const authTokenFetching = createAction(
  '[Dashboard] Auth Token fetching'
)
const tokenFailure = createAction(
  '[Dashboard] Token Failure',
  props<{ error: string }>()
)

const userInformationRequest = createAction(
  '[Login Page] User Information Request',
  props<{ token: string }>()
)

const userInformationReceived = createAction(
  '[Login Page | Dashboard] User Information Received',
  props<{ user: User }>()
)

const authenticationSocketWithToken = createAction(
  '[Login Page | Dashboard] Authorization ws connect'
)
const authenticationSocketReceived = createAction(
  '[Login Page | Dashboard] Authorization ws received'
)

const loginFailure = createAction(
  '[Login Page] Login Failure',
  props<{ error: HttpErrorResponse }>()
)

const authFailure = createAction(
  '[Dashboard] Auth Failure',
  props<{ error: string }>()
)

const unAuthorizeAccess = createAction(
  '[Dashboard] Un Auth Access'
)
const logout = createAction(
  '[Login Page | Dashboard] Logout'
)

export const AuthActions = {
  login,
  register,
  userInformationRequest,
  accessTokenReceived,
  userInformationReceived,
  loginFailure,
  accessTokenRequest,
  accessTokenLoginPageRequest,
  accessTokenRegisterPageRequest,
  authByCachedToken,
  authenticationSocketWithToken,
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  authTokenFetching,
  authFailure,
  authenticationSocketReceived,
  unAuthorizeAccess,
  logout
}


