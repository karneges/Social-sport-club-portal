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
    observableUsers: string[]
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
    observableUsers: ['5f1c2dea95f3e71249b1b074'],
    loading: false,
    usersData: []
  }
};


export const reducer = createReducer(
  initialState,
  on(TrainingActions.globalFilterStateChanged, (state, action) => {
    return {
      ...state,
      filterState: action.filterState
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
        loading: false,
        usersData: state.activitiesBySportTypesDayRange.usersData.length > 0
          ? state.activitiesBySportTypesDayRange.usersData.map(oldData => {
            const updatedData = action.data.find(newData => newData.user === oldData.user)
            return updatedData ? updatedData : oldData
          })
          : action.data
      }
    }
  }),
  on(TrainingActions.addNewObserveUser, (state, action) => {
    return {
      ...state,
      activitiesBySportTypesDayRange: {
        ...state.activitiesBySportTypesDayRange,
        loading: false,
        observableUsers: [...state.activitiesBySportTypesDayRange.observableUsers, action.userId]
      }
    }
  }),
  on(AuthActions.logout, (state, action) => {
    return initialState
  })
);

