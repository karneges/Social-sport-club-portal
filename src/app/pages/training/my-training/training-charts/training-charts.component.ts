import { Component, OnInit } from '@angular/core';
import {
  StravaActivitiesByTrainValues,
} from '../../shared/models/strava.request.model';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TrainingSelectors } from '../../shared/training.selectors';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'ngx-training-charts',
  templateUrl: './training-charts.component.html',
  styleUrls: ['./training-charts.component.scss']
})
export class TrainingChartsComponent implements OnInit {
  datForPieCharts$: Observable<StravaActivitiesByTrainValues[]>

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.datForPieCharts$ = this.store.pipe(
      select(TrainingSelectors.activitiesByTrainValues),
      filter((activities) => !!activities?.data),
      map(({ data }) => data)
    )
  }


}
