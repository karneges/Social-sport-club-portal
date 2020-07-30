import * as moment from 'moment'

export class StravaRequestModel {
  // private topBarerDate: string
  // private bottomBarerDate: string
  // private fields: TrainingTypes []

  constructor(
    private topBarerDate: string,
    private bottomBarerDate: string,
    private fields: TrainingTypes[],
    private secondaryUsers?: string[]
  ) {
  }
}

export interface StravaResponseBySportTypesModel<T extends Partial<TrainingPropsObject> = Partial<TrainingPropsObject>> {
  success: boolean
  activities: StravaActivitiesBySportTypes[]
}

export interface StravaResponseByTrainValuesModel<T extends Partial<TrainingPropsObject> = Partial<TrainingPropsObject>> {
  success: boolean
  activities: StravaActivitiesByTrainValues[]
}

export type SportTypes = 'Run' | 'Ride' | 'NordicSki' | 'Walk'
export type TrainingTypes = 'elapsed_time'
  | 'distance'
  | 'moving_time'
  | 'total_elevation_gain'
  | 'athlete_count'
  | 'average_speed'
  | 'max_speed'
  | 'average_watts'
  | 'kilojoules'

export type TrainingPropsObject = { [key in TrainingTypes]: boolean }

export type StravaActivitiesBySportTypes<T = Partial<TrainingPropsObject>> = {
  [key in keyof T]: ActivitiesStatisticValues
} & { _id: SportTypes }

export interface StravaActivitiesByTrainValues {
  _id: TrainingTypes,
  sportTypes: ActivitiesStatisticValuesWithSportType[]
}

export interface ActivitiesStatisticValues {
  min: number,
  max: number,
  sum: number,
  avg: number
}

export interface ActivitiesStatisticValuesWithSportType extends ActivitiesStatisticValues {
  sportType: SportTypes
}


