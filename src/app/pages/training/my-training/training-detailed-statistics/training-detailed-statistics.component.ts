import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TrainingSelectors } from '../../shared/training.selectors';
import { StravaActivitiesByTrainingValuesDayRange } from '../../shared/models/starava.models';
import { filter, map } from 'rxjs/operators';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'ngx-training-detailed-statistics',
  templateUrl: './training-detailed-statistics.component.html',
  styleUrls: ['./training-detailed-statistics.component.scss']
})
export class TrainingDetailedStatisticsComponent implements OnInit {
  public activitiesBySportTypesDaysRange$: Observable<StravaActivitiesByTrainingValuesDayRange<User>[]>

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.activitiesBySportTypesDaysRange$ = this.store.pipe(
      select(TrainingSelectors.activitiesBySportTypesDaysRange),
      filter((r) => r.usersData.length > 0),
      map((activitiesDaysRangeState) => activitiesDaysRangeState.usersData)
    )
  }

}


