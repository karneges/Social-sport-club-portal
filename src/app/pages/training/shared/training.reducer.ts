import { Action, createReducer, on } from '@ngrx/store';
import { StravaActivitiesBySportTypes, StravaActivitiesByTrainValues } from './models/strava.request.model';
import { FilterState } from '../my-training/training-filters/training-filters.component';
import * as moment from 'moment'
import { TrainingActions } from './training.actions';
import { compareAndReturnRenewData } from './utils/reducer-utils';
import { StravaActivitiesByTrainingValuesDayRange } from './models/starava.models';
import { AuthActions } from '../../auth/auth.actions';


export const trainingFeatureKey = 'training';

export interface TrainingState {
  bannerStatistics: {
    loading: boolean,
    data: StravaActivitiesBySportTypes[]
  }
  globalFilterState: FilterState<string>
  activitiesByTrainValues: {
    loading: boolean,
    data: StravaActivitiesByTrainValues[]
  }
  activitiesBySportType: {
    loading: boolean,
    data: StravaActivitiesBySportTypes[]
  },
  activitiesBySportTypesDayRange: {
    comparableUsers: string[]
    loading: boolean,
    usersData: StravaActivitiesByTrainingValuesDayRange[],
  }

}

export const initialState: TrainingState = {
  bannerStatistics: undefined,
  globalFilterState: undefined,
  activitiesByTrainValues: undefined,
  activitiesBySportType: undefined,
  activitiesBySportTypesDayRange: {
    //TODO remove mock value
    comparableUsers: [],
    loading: false,
    usersData: []
  }
};


export const reducer = createReducer(
  initialState,
  on(TrainingActions.globalFilterStateChanged, (state, action) => {
    return {
      ...state,
      globalFilterState: action.filterState
    }
  }),
  on(TrainingActions.loadDataForMainBanner, (state, action) => {
    return {
      ...state,
      bannerStatistics: { ...state.bannerStatistics, loading: true }
    }
  }),
  on(TrainingActions.dataForMainBannerFetched, (state, action) => {
    return {
      ...state,
      bannerStatistics: { data: action.data, loading: false }
    }
  }),
  on(TrainingActions.loadActivitiesByTrainingValue, (state, action) => {
    return {
      ...state,
      activitiesByTrainValues: { ...state.activitiesByTrainValues, loading: true }
    }
  }),
  on(TrainingActions.activitiesByTrainingValueFetched, (state, action) => {

    return {
      ...state,
      activitiesByTrainValues: {
        data: compareAndReturnRenewData(state.activitiesByTrainValues.data, action.data),
        loading: false
      }
    }
  }),
  on(TrainingActions.loadActivitiesByTrainingValueDayRange, (state, action) => {
    return {
      ...state,
      activitiesBySportTypesDayRange: {
        ...state.activitiesBySportTypesDayRange,
        loading: true
      }
    }
  }),
  on(TrainingActions.activitiesByTrainingValueDayRangeFetched, (state, action) => {
    return {
      ...state,
      activitiesBySportTypesDayRange: {
        ...state.activitiesBySportTypesDayRange,
        loading: false,
        usersData: action.data
      }
    }
  }),
  on(TrainingActions.addNewComparableUser, (state, action) => {
    return {
      ...state,
      activitiesBySportTypesDayRange: {
        ...state.activitiesBySportTypesDayRange,
        loading: false,
        comparableUsers: [...state.activitiesBySportTypesDayRange.comparableUsers, action.userId]
      }
    }
  }),
  on(TrainingActions.removeComparableUser, (state, action) => {
    return {
      ...state,
      activitiesBySportTypesDayRange: {
        ...state.activitiesBySportTypesDayRange,
        loading: false,
        comparableUsers: state.activitiesBySportTypesDayRange.comparableUsers.filter(userId => userId !== action.userId)
      }
    }
  }),
  on(AuthActions.logout, (state, action) => {
    return initialState
  }),
  on(TrainingActions.removeAllTrainingData, (state, action) => {
    return initialState
  })
);

