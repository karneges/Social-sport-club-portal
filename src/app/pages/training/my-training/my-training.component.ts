import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { StravaAthlete, User } from '../../../models/user.model';
import { AuthSelectors } from '../../auth/auth.selectors';
import { TrainingService } from '../shared/services/training.service';
import * as moment from 'moment'
import {
  StravaActivitiesBySportTypes,

} from '../shared/models/strava.request.model';
import { filter, map } from 'rxjs/operators';
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
  stravaAthlete$: Observable<StravaAthlete>
  bannerStatistics$: Observable<StravaActivitiesBySportTypes[]>
  dataForBanner$: Observable<{ activities: StravaActivitiesBySportTypes[], athlete: StravaAthlete }>
  activitiesByTraining

  constructor(private store: Store,
              private trainingService: TrainingService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private navigateService: NavigateService) {
  }

  ngOnInit(): void {
    this.stravaAthlete$ = this.store.pipe(
      select(AuthSelectors.stravaAthlete),
      filter((athlete) => !!athlete)
    )
    this.bannerStatistics$ = this.store.pipe(
      select(TrainingSelectors.bannerStatistics),
      filter((athlete) => !!athlete),
      map(({ data }) => data)
    )
    this.getBannerInformation()
  }

  getBannerInformation() {
    this.dataForBanner$ = combineLatest([this.stravaAthlete$, this.bannerStatistics$]).pipe(
      filter(([a, b]) => !!a && !!b),
      map(([athlete, activities]) => {
          return { activities, athlete }
        }
      )
    )
  }


  onFilterStateChanged(filterState: FilterState<string>): void {
    this.store.dispatch(TrainingActions.globalFilterStateChanged({ filterState }))
    this.store.dispatch(TrainingActions.loadActivitiesByTrainingValue({ filterState }))
    this.navigateService.navigateByQueryParams(filterState)
  }
}
