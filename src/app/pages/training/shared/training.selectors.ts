import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrainingState } from './training.reducer';


const selectTrainingState = createFeatureSelector<TrainingState>('training')

const globalFilterState = createSelector(
  selectTrainingState,
  (trainingState) => trainingState.globalFilterState
)
const bannerStatistics = createSelector(
  selectTrainingState,
  (trainingState) => trainingState.bannerStatistics
)

const activitiesByTrainValues = createSelector(
  selectTrainingState,
  (trainingState) => trainingState.activitiesByTrainValues
)
const activitiesBySportTypesDaysRange = createSelector(
  selectTrainingState,
  (trainingState) => trainingState?.activitiesBySportTypesDayRange
)
const activitiesBySportTypes = createSelector(
  selectTrainingState,
  (trainingState) => trainingState.activitiesBySportType
)


export const TrainingSelectors = {
  globalFilterState,
  bannerStatistics,
  activitiesByTrainValues,
  activitiesBySportTypes,
  activitiesBySportTypesDaysRange
}
