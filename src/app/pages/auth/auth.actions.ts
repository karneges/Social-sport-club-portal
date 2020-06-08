import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';


const login = createAction(
  '[Login Page] User Login',
  props<{ login: string, password: string }>()
)

const accessTokenLoginPageRequest = createAction(
  '[Login Page] Access Token Login Page Request',
  props<{ login: string, password: string }>()
)
const accessTokenRequest = createAction(
  '[Dashboard] Access Token Login Page Request',
  props<{ token: string }>()
)

const accessTokenReceived = createAction(
  '[Login Page | Dashboard] Access Token Received',
  props<{ token: string, refreshToken: string, expiresIn: string }>()
)



const userInformationRequest = createAction(
  '[Login Page] User Information Request',
  props<{ token: string }>()
)

const userInformationReceived = createAction(
  '[Login Page | Dashboard] User Information Received',
  props<{ user: User }>()
)

const loginFailure = createAction(
  '[Login Page] Login Failure',
  props<{ error: Error }>()
)

export const AuthActions = {
  login,
  userInformationRequest,
  accessTokenReceived,
  userInformationReceived,
  loginFailure,
  accessTokenRequest,
  accessTokenLoginPageRequest
}


