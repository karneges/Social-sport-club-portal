import { Action, createReducer, on } from '@ngrx/store';
import { StravaActivitiesBySportTypes, StravaActivitiesByTrainValues } from './models/strava.request.model';
import { FilterState } from '../my-training/training-filters/training-filters.component';
import * as moment from 'moment'
import { TrainingActions } from './training.actions';
import { compareAndReturnRenewData } from './utils/reducer-utils';


export const trainingFeatureKey = 'training';

export interface TrainingState {
  bannerStatistics: {
    loading: boolean,
    data: StravaActivitiesBySportTypes[]
  }
  filterState: FilterState<Date | moment.Moment>
  activitiesByTrainValues: {
    loading: boolean,
    data: StravaActivitiesByTrainValues[]
  }
  activitiesBySportType: {
    loading: boolean,
    data: StravaActivitiesBySportTypes[]
  }
}

export const initialState: TrainingState = {
  bannerStatistics: undefined,
  filterState: undefined,
  activitiesByTrainValues: undefined,
  activitiesBySportType: undefined
};


export const reducer = createReducer(
  initialState,
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
  on(TrainingActions.loadDataForCharts, (state, action) => {
    return {
      ...state,
      activitiesByTrainValues: { ...state.activitiesByTrainValues, loading: true }
    }
  }),
  on(TrainingActions.dataForChartsFetched, (state, action) => {

    return {
      ...state,
      activitiesByTrainValues: {
        data: compareAndReturnRenewData(state, action),
        loading: false
      }
    }
  }),
  on(TrainingActions.addNewTrainValue, (state, action) => {
    return {
      ...state,
      activitiesByTrainValues: {
        ...state.activitiesByTrainValues,
        data: [...state.activitiesByTrainValues.data, action.data]
      }
    }
  })
);

