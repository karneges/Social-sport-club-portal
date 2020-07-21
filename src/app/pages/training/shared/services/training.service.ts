import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import * as moment from 'moment'
import {
  StravaRequestModel,
  StravaResponseBySportTypesModel,
  TrainingTypes,
  TrainingPropsObject, StravaActivitiesByTrainValues
} from '../models/strava.request.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private baseUrl = environment.API_BASE_URL + '/strava'

  constructor(private http: HttpClient) {
  }

  addNewStravaUser(userCode: string) {
    const params = { code: userCode }
    return this.http.post(this.baseUrl, {}, { params })
  }

  getBaseStatisticsBySportTypes<T extends Partial<TrainingPropsObject>>
  ({ bottomBarerDate, topBarerDate, fields }: StatisticRequestModel) {
    const request = new StravaRequestModel(topBarerDate, bottomBarerDate, fields)
    return this.http.put<StravaResponseBySportTypesModel<T>>(this.baseUrl + '/activities-by-sport-type', request).pipe(
      map((res) => res.activities)
    )
  }

  getBaseStatisticsByTrainValues({ bottomBarerDate, topBarerDate, fields }: StatisticRequestModel) {
    const request = new StravaRequestModel(topBarerDate, bottomBarerDate, fields)
    return this.http.put<{ success: boolean, activities: StravaActivitiesByTrainValues[] }>(
      this.baseUrl + '/activities-by-train-values', request)
  }
}

export interface StatisticRequestModel {
  bottomBarerDate: string,
  topBarerDate: string,
  fields: TrainingTypes[]
}

