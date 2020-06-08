import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';


const selectAuthState = createFeatureSelector<AuthState>('auth')

const token = createSelector(
  selectAuthState,
  (authState) => authState.token
)

const user = createSelector(
  selectAuthState,
  (authState) => authState.user
)


const fetchingToken = createSelector(
  selectAuthState,
  (authState) => authState.fetchingToken
)

const loadingUser = createSelector(
  selectAuthState,
  (authState) => authState.loadingUser
)

export const AuthSelectors = {
  token, user, fetchingToken, loadingUser
}