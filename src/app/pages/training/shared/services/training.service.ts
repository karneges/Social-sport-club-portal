import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import * as moment from 'moment'
import {
  StravaRequestModel,
  StravaResponseBySportTypesModel,
  TrainingTypes,
  TrainingPropsObject, StravaResponseByTrainValuesModel
} from '../models/strava.request.model';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { StravaActivitiesByTrainingValuesDayRange } from '../models/starava.models';
import { User } from '../../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private baseUrl = environment.API_BASE_URL + '/strava'

  constructor(private http: HttpClient) {
  }

  onUserConnectStravaAccount(userCode: string): Observable<User> {
    const params = { code: userCode }
    return this.http.post<{ success: boolean, user: User }>(this.baseUrl, {}, { params }).pipe(
      map(({ user }) => user)
    )
  }

  onUserDisconnectStravaAccount(): Observable<User> {
    return this.http.delete<{ success: boolean, user: User }>(this.baseUrl).pipe(
      map(({ user }) => user)
    )
  }

  getBaseStatisticsBySportTypes<T extends Partial<TrainingPropsObject>>(requestBody: StatisticRequestModel) {
    return this.http.put<StravaResponseBySportTypesModel<T>>(
      this.baseUrl + '/activities-by-sport-type',
      this.getRequestConfig(requestBody)
    ).pipe(pluck('activities'))
  }

  getBaseStatisticsByTrainValues(requestBody: StatisticRequestModel) {
    return this.http.put<StravaResponseByTrainValuesModel>(
      this.baseUrl + '/activities-by-train-values', this.getRequestConfig(requestBody))
  }

  getActivitiesTrainValuesByDayRange(requestBody: StatisticRequestModel): Observable<StravaActivitiesByTrainingValuesDayRange[]> {
    return this.http.put<StatisticResponseModelByDayRange>(
      this.baseUrl + '/activities-by-train-values/days', this.getRequestConfig(requestBody)).pipe(
      pluck('activities')
    )
  }

  getRequestConfig({ bottomBarerDate, topBarerDate, fields,secondaryUsers }: StatisticRequestModel): StravaRequestModel {
    return new StravaRequestModel(topBarerDate, bottomBarerDate, fields, secondaryUsers)
  }
}

export interface StatisticRequestModel {
  bottomBarerDate: string,
  topBarerDate: string,
  fields: TrainingTypes[],
  secondaryUsers?:string[]
}

//
// export interface StatisticResponseModel {
//   success: boolean,
//   activities: StravaActivitiesByTrainValues[]
// }

export interface StatisticResponseModelByDayRange {
  success: boolean,
  activities: StravaActivitiesByTrainingValuesDayRange[]
}

