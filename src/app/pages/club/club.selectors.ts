import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClubState } from './reducers';


const selectClubState = createFeatureSelector<ClubState>('clubState')

const club = createSelector(
  selectClubState,
  (clubState) => clubState.club
)

const postsOfClub = createSelector(
  club,
  ({ posts }) => posts
)


export const ClubSelectors = {
  club,
  postsOfClub
}
