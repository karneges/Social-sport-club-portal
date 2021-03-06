import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { StravaAthlete } from '../../../../models/user.model';
import { environment } from '../../../../../environments/environment';
import { StravaActivitiesBySportTypes } from '../../shared/models/strava.request.model';


@Component({
  selector: 'ngx-training-banner',
  templateUrl: './training-banner.component.html',
  styleUrls: ['./training-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingBannerComponent implements OnInit {
  @Input() activitiesAndAthlete: { activities: StravaActivitiesBySportTypes[], athlete: StravaAthlete }
  trainName = 'My Awesome Train'
  activities: StravaActivitiesBySportTypes[]
  athlete: StravaAthlete
  sumOfTrainTypes: number
  ngOnInit(): void {
    this.activities = this.activitiesAndAthlete.activities
    this.athlete = this.activitiesAndAthlete.athlete
    this.sumOfTrainTypes = this.activities.reduce((acc, current) => acc + current.distance.sum, 0)
  }
  getPercentOfActivity(activity: StravaActivitiesBySportTypes) {
    return activity.distance.sum / this.sumOfTrainTypes * 100
  }


}
