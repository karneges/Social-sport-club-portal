import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { StaravaAthlete, User } from '../../../models/user.model';
import { AuthSelectors } from '../../auth/auth.selectors';
import { StatisticRequestModel, TrainingService } from '../shared/services/training.service';
import * as moment from 'moment'
import {
  StravaActivitiesBySportTypes,

} from '../shared/models/strava.request.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterState } from './training-filters/training-filters.component';
import { NavigateService } from '../../../shared/services/navigate.service';

import { TrainingSelectors } from '../shared/training.selectors';
import { TrainingActions } from '../shared/training.actions';

@Component({
  selector: 'ngx-my-training',
  templateUrl: './my-training.component.html',
  styleUrls: ['./my-training.component.scss']
})
export class MyTrainingComponent implements OnInit {
  stravaAthlete$: Observable<StaravaAthlete>
  bannerStatistics$: Observable<StravaActivitiesBySportTypes[]>
  dataForBanner$: Observable<{ activities: StravaActivitiesBySportTypes[], athlete: StaravaAthlete }>
  activitiesByTraining

  constructor(private store: Store,
              private trainingService: TrainingService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private navigateService: NavigateService) {
  }

  ngOnInit(): void {
    this.stravaAthlete$ = this.store.pipe(select(AuthSelectors.stravaAthlete))
    this.bannerStatistics$ = this.store.pipe(
      select(TrainingSelectors.bannerStatistics),
      map(({ data }) => data)
    )
    this.getBannerInformation()
  }

  getBannerInformation() {
    this.dataForBanner$ = combineLatest([this.stravaAthlete$, this.bannerStatistics$]).pipe(
      map(([athlete, activities]) => ({ activities, athlete }))
    )
  }


  onFilterStateChanged(filterState: FilterState<string>): void {
    this.store.dispatch(TrainingActions.loadDataForCharts({filterState}))
    this.navigateService.navigateByQueryParams(filterState)
  }
}
