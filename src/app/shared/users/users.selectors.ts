import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer'


const selectUserState = createFeatureSelector<UsersState>('users')

const users = createSelector(
  selectUserState,
  (userState) => userState.users
)

const loadingUsers = createSelector(
  selectUserState,
  (usersState) => usersState.loading
)


export const UsersSelectors = {
  users,
  loadingUsers
}
