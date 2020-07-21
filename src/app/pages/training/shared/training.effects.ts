import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TrainingActions } from './training.actions';
import { map, switchMap } from 'rxjs/operators';
import { TrainingService } from './services/training.service';
import * as moment from 'moment';


@Injectable()
export class TrainingEffects {

  loadingDataForMainBanner$ = createEffect(() => this.actions$.pipe(
    ofType(TrainingActions.loadDataForMainBanner),
    switchMap(() => this.trainingService.getBaseStatisticsBySportTypes({
      bottomBarerDate: moment().subtract(2, 'y').format(),
      topBarerDate: moment().format(),
      fields: ['distance']
    })),
    map((res) => TrainingActions.dataForMainBannerFetched({ data: res }))
  ))
  loadingDataForCharts$ = createEffect(() => this.actions$.pipe(
    ofType(TrainingActions.loadDataForCharts),
    switchMap(({ filterState }) => this.trainingService.getBaseStatisticsByTrainValues(filterState)),
    map((res) => TrainingActions.dataForChartsFetched({ data: res.activities }))
  ))


  constructor(private actions$: Actions, private trainingService: TrainingService) {
  }

}
