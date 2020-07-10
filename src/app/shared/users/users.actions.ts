import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';


const fetchedUsers = createAction(
  '[Dashboard] Users fetched',
  props<{ users: User[] }>()
)
const loadUsers = createAction(
  '[Dashboard] Users fetching'
)
const loadUserById = createAction(
  '[Dashboard] One User fetching',
  props<{ id: string }>()
)
const fetchedUserById = createAction(
  '[Dashboard] User fetched',
  props<{ user: User }>()
)
const userStatusChanged = createAction(
  '[WS Event] New User Online/Offline',
  props<{ user: User }>()
)
const userStatusChangedWSSubscription = createAction(
  '[WS Event] New User Online/Offline',
)


export const UserActions = {
  fetchedUsers,
  fetchedUserById,
  loadUsers,
  loadUserById,
  userStatusChanged,
  userStatusChangedWSSubscription
}
