import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { StaravaAthlete, User } from '../../../models/user.model';
import { AuthSelectors } from '../../auth/auth.selectors';
import { StatisticRequestModel, TrainingService } from '../shared/services/training.service';
import * as moment from 'moment'
import {
  StravaActivities,
  StravaRequestModel,
  TrainingPropsObject,
  TrainingTypes
} from '../shared/models/strava.request.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterState } from './training-filters/training-filters.component';
import { NavigateService } from '../../../shared/services/navigate.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'ngx-my-training',
  templateUrl: './my-training.component.html',
  styleUrls: ['./my-training.component.scss']
})
export class MyTrainingComponent implements OnInit {
  authUser$: Observable<User>
  stravaAthlete$: Observable<StaravaAthlete>
  dataFromBanner$: Observable<{ activities: StravaActivities[], athlete: StaravaAthlete }>
  dataFromCharts$: Observable<StravaActivities[]>
  private sub = new SubSink()

  constructor(private store: Store,
              private trainingService: TrainingService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private navigateService: NavigateService) {
  }

  ngOnInit(): void {
    this.stravaAthlete$ = this.store.pipe(select(AuthSelectors.stravaAthlete))
    this.getMainBannerInfo()
    this.getActivitiesFromFilter()
  }

  getMainBannerInfo() {
    const statisticConfig: TrainingTypes[] = ['distance']
    const yearStatistics$ = this.trainingService
      .getBaseStatistics({
        bottomBarerDate: moment().subtract(2, 'y').format(),
        topBarerDate: moment().format(),
        fields: statisticConfig
      })
    this.dataFromBanner$ = combineLatest([this.stravaAthlete$, yearStatistics$]).pipe(
      map(([athlete, activities]) => {
        return { activities, athlete }
      })
    )
  }

  getActivitiesFromFilter() {
    this.sub.sink = this.activatedRoute.queryParams.pipe(
      switchMap((params: StatisticRequestModel) => {
        console.log(params)
        return this.trainingService.getBaseStatistics(params)
      })
    ).subscribe()
  }


  onFilterStateChanged(filterState: FilterState<string>) {
    this.navigateService.navigateByQueryParams(filterState)
  }
}
