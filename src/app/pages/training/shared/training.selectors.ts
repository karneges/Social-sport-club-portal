import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrainingState } from './training.reducer';


const selectTrainingState = createFeatureSelector<TrainingState>('training')

const bannerStatistics = createSelector(
  selectTrainingState,
  (trainingState) => trainingState.bannerStatistics
)

const activitiesByTrainValues = createSelector(
  selectTrainingState,
  (trainingState) => trainingState.activitiesByTrainValues
)
const activitiesBySportTypes = createSelector(
  selectTrainingState,
  (trainingState) => trainingState.activitiesBySportType
)


export const TrainingSelectors = {
  bannerStatistics,
  activitiesByTrainValues,
  activitiesBySportTypes
}
