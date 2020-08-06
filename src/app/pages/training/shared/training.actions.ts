import { createAction, props } from '@ngrx/store';
import { StravaActivitiesBySportTypes, StravaActivitiesByTrainValues } from './models/strava.request.model';
import { FilterState } from '../my-training/training-filters/training-filters.component';
import * as moment from 'moment'
import { StravaActivitiesByTrainingValuesDayRange } from './models/starava.models';


const userConnectStravaAccount = createAction(
  '[Sport Services Page] User connect to Strava',
  props<{ stravaRegisterCode: string }>()
);
const userDisconnectStravaAccount = createAction(
  '[Sport Services Page] User disconnect to Strava'
);
const globalFilterStateChanged = createAction(
  '[Training Page] Global Filter State was Changed',
  props<{ filterState: FilterState<string> }>()
);
const loadDataForMainBanner = createAction(
  '[Training Page] Load Data For main Banner'
)
const dataForMainBannerFetched = createAction(
  '[Training Page] Data For main Banner Fetched',
  props<{ data: StravaActivitiesBySportTypes[] }>()
)
const loadActivitiesByTrainingValue = createAction(
  '[Training Page] Load Activities By Training Value',
  props<{ filterState: FilterState<string> }>()
)
const activitiesByTrainingValueFetched = createAction(
  '[Training Page] Activities By Training Value Fetched Fetched',
  props<{ data: StravaActivitiesByTrainValues[] }>()
)
const loadActivitiesByTrainingValueDayRange = createAction(
  '[Training Page] Load Activities By Training Value Day Range',
  props<{ userId: string | string[] }>()
)
const activitiesByTrainingValueDayRangeFetched = createAction(
  '[Training Page] Activities By Training Value Day Range Fetched',
  props<{ data: StravaActivitiesByTrainingValuesDayRange[] }>()
)
const removeStatisticsByTrainValuesFromOneUser = createAction(
  '[Training Page] Remove Statistics From User',
  props<{ userId: string }>()
)
const addNewComparableUser = createAction(
  '[Training Page] Add New User To Comparable',
  props<{ userId: string }>()
)
const removeComparableUser = createAction(
  '[Training Page] Remove User from Comparable',
  props<{ userId: string }>()
)


export const TrainingActions = {
  userConnectStravaAccount,
  userDisconnectStravaAccount,
  globalFilterStateChanged,
  loadActivitiesByTrainingValue,
  activitiesByTrainingValueFetched,
  loadDataForMainBanner,
  dataForMainBannerFetched,
  loadActivitiesByTrainingValueDayRange,
  activitiesByTrainingValueDayRangeFetched,
  removeStatisticsByTrainValuesFromOneUser,
  addNewComparableUser,
  removeComparableUser
}



