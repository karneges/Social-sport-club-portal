import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import { UserActions } from './users.actions';
import { replaceEntity } from '../../../utils/changeEntityInList';


export const usersFeatureKey = 'users';

export interface UsersState {
  users: User[],
  loading: boolean,
}

export const initialState: UsersState = {
  users: undefined,
  loading: undefined
};


export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsers, ((state, action) => {
    return {
      ...state,
      loading: true
    }
  })),
  on(UserActions.fetchedUsers, ((state, action) => {
    return {
      users: action.users,
      loading: false
    }
  })),
  on(UserActions.loadUserById, ((state, action) => {
    return {
      ...state,
      loading: true
    }
  })),
  on(UserActions.fetchedUserById, ((state, action) => {
    return {
      ...state,
      users: [...state.users, action.user]
    }
  })),
  on(UserActions.userStatusChanged, ((state, action) => {
    return {
      ...state,
      users: replaceEntity(state.users, action.user)
    }
  }))
);


