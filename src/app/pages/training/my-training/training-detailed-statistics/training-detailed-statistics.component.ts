import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LineChartConfig } from '../../shared/services/training-charts.service';
import { FilterState } from '../training-filters/training-filters.component';
import { TrainingSelectors } from '../../shared/training.selectors';
import { StravaActivitiesByTrainingValuesDayRange } from '../../shared/models/starava.models';
import { filter, map } from 'rxjs/operators';
import { TrainingTypes } from '../../shared/models/strava.request.model';

@Component({
  selector: 'ngx-training-detailed-statistics',
  templateUrl: './training-detailed-statistics.component.html',
  styleUrls: ['./training-detailed-statistics.component.scss']
})
export class TrainingDetailedStatisticsComponent implements OnInit {
  lineChartsConfigs$: Observable<{ trainingType: TrainingTypes, chartConfigs: LineChartConfig[] }[]>
  globalDateFilterState$: Observable<FilterState<string>>
  // stravaAthlete$: Observable<StravaAthlete>
  activitiesBySportTypesDaysRange$: Observable<StravaActivitiesByTrainingValuesDayRange[]>

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.globalDateFilterState$ = this.store.pipe(select(TrainingSelectors.globalFilterState))
    this.activitiesBySportTypesDaysRange$ = this.store.pipe(
      select(TrainingSelectors.activitiesBySportTypesDaysRange),
      filter((r) => r.usersData.length > 0),
      map((activitiesDaysRangeState) => activitiesDaysRangeState.usersData)
    )
    // // this.lineChartsConfigs$ = combineLatest([this.globalDateFilterState$, this.activitiesBySportTypesDaysRange$])
    // //   .pipe(
    // //     map(([filterState,activities]) => {
    // //
    // //     })
    // //   )
    // this.lineChartsConfigs$ = this.activitiesBySportTypesDaysRange$.pipe(
    //   map((activities) => {
    //     return  activities.map(oneActivity => {
    //       return {
    //         trainingType:oneActivity.userActivities
    //       }
    //     })
    //   })
    // )
  }

}


