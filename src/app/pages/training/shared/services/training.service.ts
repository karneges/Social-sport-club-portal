import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StravaRegisterUser } from '../models/starava.models';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private baseUrl = environment.API_BASE_URL + '/strava'

  constructor(private http: HttpClient) {
  }

  addNewStravaUser(userCode: string) {
    console.log(userCode, 'user code')
    const params = {code: userCode}
    return this.http.post(this.baseUrl, {}, { params })
  }
}
