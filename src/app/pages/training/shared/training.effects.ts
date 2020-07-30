import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TrainingActions } from './training.actions';
import { distinctUntilChanged, map, pluck, switchMap, tap } from 'rxjs/operators';
import { TrainingService } from './services/training.service';
import * as moment from 'moment';
import { AuthActions } from '../../auth/auth.actions';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, observable, of } from 'rxjs';
import { TrainingSelectors } from './training.selectors';
import { AuthSelectors } from '../../auth/auth.selectors';
import { FilterState } from '../my-training/training-filters/training-filters.component';


@Injectable()
export class TrainingEffects {
  /*
    Connect strava account
  */
  userConnectStravaAccount$ = createEffect(() => this.actions$.pipe(
    ofType(TrainingActions.userConnectStravaAccount),
    tap(() => this.store.dispatch(AuthActions.userInformationUpdateRequest())),
    switchMap(({ stravaRegisterCode }) => this.trainingService.onUserConnectStravaAccount(stravaRegisterCode)),
    map((user) => AuthActions.updatedUserInformationReceived({ user }))
  ))
  /*
    Disconnect Strava Account
   */
  userDisconnectStravaAccount$ = createEffect(() => this.actions$.pipe(
    ofType(TrainingActions.userDisconnectStravaAccount),
    tap(() => this.store.dispatch(AuthActions.userInformationUpdateRequest())),
    switchMap(() => this.trainingService.onUserDisconnectStravaAccount()),
    map((user) => AuthActions.updatedUserInformationReceived({ user }))
  ))
  /*
    Loading default Data For Main User
   */
  loadingDataForMainBanner$ = createEffect(() => this.actions$.pipe(
    ofType(TrainingActions.loadDataForMainBanner),
    switchMap(() => this.trainingService.getBaseStatisticsBySportTypes({
      bottomBarerDate: moment().subtract(2, 'y').format(),
      topBarerDate: moment().format(),
      fields: ['distance']
    })),
    map((res) => TrainingActions.dataForMainBannerFetched({ data: res }))
  ))
  /*
  Loading statistics for general pie charts
   */
  loadingDataForCharts$ = createEffect(() => this.actions$.pipe(
    ofType(TrainingActions.loadActivitiesByTrainingValue),
    switchMap(({ filterState }) => this.trainingService.getBaseStatisticsByTrainValues(filterState)),
    map((res) => TrainingActions.activitiesByTrainingValueFetched({ data: res.activities }))
  ))

  /*
  Loading day range statistics.
  if observableUsers array is empty
  then will load statistic only for main user
  else  main user + observable users
   */
  loadingActivitiesByTrainingValueDayRange$ = createEffect(() => this.actions$.pipe(
    ofType(TrainingActions.globalFilterStateChanged),
    switchMap(({ filterState }) => this.combinedFilterStateAndActivitiesDayRange(filterState)),
    map(([activitiesDayRangeState, athlete, filterState]) => {
      if (!activitiesDayRangeState?.observableUsers) {
        return filterState
      }
      return {
        ...filterState,
        secondaryUsers: activitiesDayRangeState.observableUsers
      }
    }),
    switchMap((filterAndObservableUsersState) => this.trainingService
      .getActivitiesTrainValuesByDayRange(filterAndObservableUsersState)
    ),
    map((data) => {
      return  TrainingActions.activitiesByTrainingValueDayRangeFetched({ data })
    })
  ))

  /*
  Combined filter State and Activities Day Range
   */
  combinedFilterStateAndActivitiesDayRange(filterState: FilterState<string>) {
    const activitiesBySportTypesDaysRangeDistinct$ = this.store.pipe(
      select(TrainingSelectors.activitiesBySportTypesDaysRange),
      distinctUntilChanged((prev, next) => {
        return prev.observableUsers?.length === prev.observableUsers?.length
      })
    )
    const athlete$ = this.store.pipe(select(AuthSelectors.stravaAthlete))
    return combineLatest([activitiesBySportTypesDaysRangeDistinct$, athlete$, of(filterState)])
  }

  constructor(private actions$: Actions, private trainingService: TrainingService, private store: Store) {
  }

}
