import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';


const selectAuthState = createFeatureSelector<AuthState>('auth')

const token = createSelector(
  selectAuthState,
  (authState) => authState.token
)

const tokenWithAccessType = createSelector(
  selectAuthState,
  ({ token, unAuthAccess }) => ({token, unAuthAccess})
)

const user = createSelector(
  selectAuthState,
  (authState) => authState.user
)


const fetchingToken = createSelector(
  selectAuthState,
  (authState) => authState.fetchingToken
)

const isUnAuthAccess = createSelector(
  selectAuthState,
  (authState) => authState.unAuthAccess
)

const loadingUser = createSelector(
  selectAuthState,
  (authState) => authState.loadingUser
)
const authErrors = createSelector(
  selectAuthState,
  (authState) => authState.error
)

export const AuthSelectors = {
  token, user, fetchingToken, loadingUser, tokenWithAccessType, isUnAuthAccess, authErrors
}
