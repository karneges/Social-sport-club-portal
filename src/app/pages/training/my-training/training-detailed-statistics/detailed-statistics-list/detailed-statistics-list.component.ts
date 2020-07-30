import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { StravaActivitiesByTrainingValuesDayRange } from '../../../shared/models/starava.models';

@Component({
  selector: 'ngx-detailed-statistics-list',
  templateUrl: './detailed-statistics-list.component.html',
  styleUrls: ['./detailed-statistics-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedStatisticsListComponent implements OnInit {
  @Input() set activitiesBySportTypesDaysRange(stravaActivitiesByTrainingValuesDayRange:StravaActivitiesByTrainingValuesDayRange[]) {
    this.mainUserStat = stravaActivitiesByTrainingValuesDayRange[0]
  }

  mainUserStat:StravaActivitiesByTrainingValuesDayRange
  constructor() {
  }

  ngOnInit(): void {
  }

}
