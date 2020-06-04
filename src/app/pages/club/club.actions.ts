import { createAction, props } from '@ngrx/store';
import { Club } from './models/club.model';


const fetchedClub = createAction(
  '[Club Page] Club fetched',
  props<{ club: Club }>()
)
const loadClub = createAction(
  '[Club Page] Club fetching'
)

export const ClubActions = {
  fetchedClub,
  loadClub
}
