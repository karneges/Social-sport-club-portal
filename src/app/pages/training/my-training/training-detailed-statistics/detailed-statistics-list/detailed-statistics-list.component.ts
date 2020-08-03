import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { StravaActivitiesByTrainingValuesDayRange } from '../../../shared/models/starava.models';
import { TrainingTypes } from '../../../shared/models/strava.request.model';

@Component({
  selector: 'ngx-detailed-statistics-list',
  templateUrl: './detailed-statistics-list.component.html',
  styleUrls: ['./detailed-statistics-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedStatisticsListComponent implements OnInit {
  @Input() set activitiesBySportTypesDaysRange(stravaActivitiesByTrainingValuesDayRange:StravaActivitiesByTrainingValuesDayRange[]) {
    this.mainUserStat = stravaActivitiesByTrainingValuesDayRange[0]
    this.fullUsersStatistics = stravaActivitiesByTrainingValuesDayRange
  }

  mainUserStat:StravaActivitiesByTrainingValuesDayRange
  fullUsersStatistics:StravaActivitiesByTrainingValuesDayRange[]
  constructor() {
  }

  ngOnInit(): void {
    debugger
  }

}

export interface Search {
  activities:{
    type:TrainingTypes,
    activitiesByType: {

    }
  }[]
}
