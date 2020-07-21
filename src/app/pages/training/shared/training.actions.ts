import { createAction, props } from '@ngrx/store';
import { StravaActivitiesBySportTypes, StravaActivitiesByTrainValues } from './models/strava.request.model';
import { FilterState } from '../my-training/training-filters/training-filters.component';
import * as moment from 'moment'

const loadDataForMainBanner = createAction(
  '[Training Page] Load Data For main Banner'
);
const dataForMainBannerFetched = createAction(
  '[Training Page] Data For main Banner Fetched',
  props<{ data: StravaActivitiesBySportTypes[] }>()
)
const loadDataForCharts = createAction(
  '[Training Page] Load Data For Pie Charts',
  props<{ filterState: FilterState<string> }>()
)
const dataForChartsFetched = createAction(
  '[Training Page] Data For Pie Charts Fetched',
  props<{ data: StravaActivitiesByTrainValues[] }>()
)
const addNewTrainValue = createAction(
  '[Training Page] Add New Train Value',
  props<{ data: StravaActivitiesByTrainValues }>()
)

export const TrainingActions = {
  loadDataForCharts,
  dataForChartsFetched,
  loadDataForMainBanner,
  dataForMainBannerFetched,
  addNewTrainValue
}



