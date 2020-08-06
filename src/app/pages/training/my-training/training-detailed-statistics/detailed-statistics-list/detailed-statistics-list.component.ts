import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StravaActivitiesByTrainingValuesDayRange } from '../../../shared/models/starava.models';
import { TrainingTypes } from '../../../shared/models/strava.request.model';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FilterState } from '../../training-filters/training-filters.component';
import { User } from '../../../../../models/user.model';
import { AuthSelectors } from '../../../../auth/auth.selectors';
import { TrainingSelectors } from '../../../shared/training.selectors';
import { filter, first, map, scan, tap, withLatestFrom } from 'rxjs/operators';
import { useAnimation } from '@angular/animations';

@Component({
  selector: 'ngx-detailed-statistics-list',
  templateUrl: './detailed-statistics-list.component.html',
  styleUrls: ['./detailed-statistics-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedStatisticsListComponent implements OnInit {
  private globalDateFilterState$: Observable<FilterState<string>>
  public authUser$: Observable<User>
  public activitiesBySportTypesDaysRange$: Observable<StravaActivitiesByTrainingValuesDayRange[]>
  public mainUserStat: Observable<StravaActivitiesByTrainingValuesDayRange>
  public dateFilterState$: Observable<{ startDate: string, endDate: string }>

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.authUser$ = this.store.pipe(select(AuthSelectors.user))
    this.globalDateFilterState$ = this.store.pipe(select(TrainingSelectors.globalFilterState))
    this.activitiesBySportTypesDaysRange$ = this.store.pipe(
      select(TrainingSelectors.activitiesBySportTypesDaysRange),
      filter((r) => r.usersData.length > 0),
      map((activitiesDaysRangeState) => activitiesDaysRangeState.usersData)
    )

    this.mainUserStat = this.activitiesBySportTypesDaysRange$.pipe(
      withLatestFrom(this.authUser$),
      map(([activitiesBySportTypesDaysRange, authUser]) => activitiesBySportTypesDaysRange
        .find(activity => activity.user._id === authUser._id)),
      first()
    )

    this.dateFilterState$ = this.store.pipe(
      select(TrainingSelectors.globalFilterState),
      map(({ bottomBarerDate, topBarerDate }) => ({ startDate: bottomBarerDate, endDate: topBarerDate }))
    )
  }

}
