import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';
import { ClubActions } from '../club.actions';
import { Club } from '../models/club.model';

export const clubFeatureKey = 'clubState';

export interface ClubState {
  club: Club,
  loading: boolean
}

export const initialClubState: ClubState = {
  club: undefined,
  loading: undefined
}

// export const reducers: ActionReducerMap<ClubState> = {
// };

export const clubReducer = createReducer(
  initialClubState,

  on(ClubActions.fetchedClub, ((state, action): ClubState => {
    return {
      ...state,
      club: action.club,
      loading: false
    }
  })),
  on(ClubActions.loadClub, ((state, action) => {
    return {
      ...state,
      loading: true
    }
  }))
)
