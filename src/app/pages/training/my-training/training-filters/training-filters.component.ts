import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainingTypes } from '../../shared/models/strava.request.model';
import * as moment from 'moment'
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';
import { SportValuesFilterMap } from '../../shared/models/Strava-filter-map';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ngx-training-filters',
  templateUrl: './training-filters.component.html',
  styleUrls: ['./training-filters.component.scss']
})
export class TrainingFiltersComponent implements OnInit, OnDestroy {
  trainingTypes: { id: TrainingTypes, fieldName: string }[] = Object.entries(SportValuesFilterMap)
    .map(([id, fieldName]) => ({ id, fieldName })) as { id: TrainingTypes, fieldName: string }[]

  filterForm: FormGroup
  sub = new SubSink()
  @Input() data: {}
  @Output() filterStateChanged = new EventEmitter<FilterState<string>>()

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private store: Store) {
  }

  ngOnInit(): void {
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
        }, { topBarerDate: undefined, fields: undefined, bottomBarerDate: undefined })
      }),
      filter((filterState) => this.isFilterFullFill(filterState)),
      distinctUntilChanged((prev, next) => JSON.stringify(prev) === JSON.stringify(next)),
      debounceTime(1000),
      tap((formState) => this.filterStateChanged.emit(formState))
    ).subscribe()
  }

  getInitialDate(fieldName: string) {
    return this.route.snapshot.queryParams[fieldName]
      ? new Date(this.route.snapshot.queryParams[fieldName])
      : null
  }

  getInitialFields(fieldName: string) {
    // if only one train type , this.route.snapshot.queryParams[fieldName] return string, not array
    // need convert string to [string]
    return this.route.snapshot.queryParams[fieldName]
      ? typeof this.route.snapshot.queryParams[fieldName] === 'object'
        ? this.route.snapshot.queryParams[fieldName]
        : [this.route.snapshot.queryParams[fieldName]]
      : []
  }
  isFilterFullFill(filterState: FilterState<string>) {
    return filterState.fields.length > 0 && Object.values(filterState).every(field => !!field)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}

export interface FilterState<T> {
  fields: TrainingTypes[],
  bottomBarerDate: T,
  topBarerDate: T
}

