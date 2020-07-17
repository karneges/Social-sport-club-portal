import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import * as moment from 'moment'
import {
  StravaRequestModel,
  StravaResponseModel,
  TrainingTypes,
  TrainingPropsObject
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
    // this.getBaseStatistics(moment(), moment(), { distance: true }).pipe()
  }

  getBaseStatistics<T extends Partial<TrainingPropsObject>>
  ({ bottomBarerDate, topBarerDate, fields }: StatisticRequestModel) {
    const request = new StravaRequestModel(topBarerDate, bottomBarerDate, fields)
    return this.http.put<StravaResponseModel<T>>(this.baseUrl + '/activities', request).pipe(
      map((res) => res.activities)
    )
  }
}

export interface StatisticRequestModel {
  bottomBarerDate: string,
  topBarerDate: string,
  fields: TrainingTypes[]
}

