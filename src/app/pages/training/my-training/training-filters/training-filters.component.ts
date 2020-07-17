import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainingTypes } from '../../shared/models/strava.request.model';
import * as moment from 'moment'
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'ngx-training-filters',
  templateUrl: './training-filters.component.html',
  styleUrls: ['./training-filters.component.scss']
})
export class TrainingFiltersComponent implements OnInit, OnDestroy {
  trainingTypes: { id: TrainingTypes, fieldName: string }[] = [
    { id: 'elapsed_time', fieldName: 'Elapsed Time' },
    { id: 'distance', fieldName: 'Distance' },
    { id: 'total_elevation_gain', fieldName: 'Total Elevation Gain' },
    { id: 'athlete_count', fieldName: 'Athlete Count' },
    { id: 'average_speed', fieldName: 'Average Speed' },
    { id: 'max_speed', fieldName: 'Max Speed' },
    { id: 'average_watts', fieldName: 'Average Watts' },
    { id: 'kilojoules', fieldName: 'Kilojoules' },
  ]
  filterForm: FormGroup
  sub = new SubSink()
  @Input() data: {}
  @Output() filterStateChanged = new EventEmitter<FilterState<string>>()

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // console.log(this.route.snapshot.queryParams.startDate)
    this.filterForm = this.fb.group({
      fields: [this.getInitialFields('fields'), [Validators.required]],
      bottomBarerDate: [this.getInitialDate('bottomBarerDate'), [Validators.required]],
      topBarerDate: [this.getInitialDate('topBarerDate'), [Validators.required]]
    })

    this.sub.sink = this.filterForm.valueChanges.pipe(
      map<FilterState<Date>, FilterState<string>>((formState) => {
        return Object.entries(formState).reduce((acc: FilterState<string>, [key, value]) => {
          const newValue = value instanceof Date ? moment(value).format() : value
          return {
            ...acc,
            [key]: newValue
          }
        }, { topBarerDate: undefined, picker: [], bottomBarerDate: undefined })
      }),
      distinctUntilChanged((prev, next) => JSON.stringify(prev) === JSON.stringify(next)),
      tap((formState) => this.filterStateChanged.emit(formState))
    ).subscribe()
  }

  getInitialDate(fieldName: string) {
    return this.route.snapshot.queryParams[fieldName]
      ? new Date(this.route.snapshot.queryParams[fieldName])
      : null

  }

  getInitialFields(fieldName: string) {
    return this.route.snapshot.queryParams[fieldName]
      ? this.route.snapshot.queryParams[fieldName]
      : []
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }


}

export interface FilterState<T> {
  picker: TrainingTypes[],
  bottomBarerDate: T,
  topBarerDate: T
}

