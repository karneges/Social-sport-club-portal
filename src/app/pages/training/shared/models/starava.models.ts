import { HttpParams } from '@angular/common/http';
import { SportTypes, TrainingTypes } from './strava.request.model';
import { StravaAthlete, User } from '../../../../models/user.model';

export class StravaRegisterUser extends HttpParams {
  code: string
}

export interface StravaActivitiesByTrainingValuesDayRange {
  user: string
  userActivities: {
    type: SportTypes,
    valuesByType: ValuesBySportTypeWithDayRange[]
  }[]
}

export interface ValuesBySportTypeWithDayRange {
  valuesByTrainingDimensionName: ActivityFromDateAndValue[],
  trainingDimensionName: string
}

export interface ActivityFromDateAndValue {
  date: string,
  value: number
}

export interface ActivitySportValue {
  sportValueName: TrainingTypes,
  value: number
}

