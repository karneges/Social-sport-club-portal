import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { StaravaAthlete } from '../../../../models/user.model';
import { environment } from '../../../../../environments/environment';
import { StravaActivities } from '../../shared/models/strava.request.model';


@Component({
  selector: 'ngx-training-banner',
  templateUrl: './training-banner.component.html',
  styleUrls: ['./training-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingBannerComponent implements OnInit {
  @Input() activitiesAndAthlete: { activities: StravaActivities[], athlete: StaravaAthlete }
  STRAVA_URL = environment.STRAVA_AUTH_URL
  trainName = 'My Awesome Train'
  activities: StravaActivities[]
  athlete: StaravaAthlete
  sumOfTrainTypes: number
  ngOnInit(): void {
    this.activities = this.activitiesAndAthlete.activities
    this.athlete = this.activitiesAndAthlete.athlete
    this.sumOfTrainTypes = this.activities.reduce((acc, current) => acc + current.distance.sum, 0)
  }
  getPercentOfActivity(activity: StravaActivities) {
    return activity.distance.sum / this.sumOfTrainTypes * 100
  }


}
