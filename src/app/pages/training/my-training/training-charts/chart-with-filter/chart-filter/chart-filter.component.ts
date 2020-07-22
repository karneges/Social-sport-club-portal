import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivitiesStatisticValues } from '../../../../shared/models/strava.request.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, pluck, startWith, tap } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Component({
  selector: 'ngx-chart-filter',
  templateUrl: './chart-filter.component.html',
  styleUrls: ['./chart-filter.component.scss']
})
export class ChartFilterComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<keyof ActivitiesStatisticValues>()
  filterForm: FormGroup
  private sub = new SubSink()
  filterFields: { id: keyof ActivitiesStatisticValues, fieldName: string }[] = [
    { id: 'min', fieldName: 'Min Value' },
    { id: 'max', fieldName: 'Max Value' },
    { id: 'avg', fieldName: 'Average Value' },
    { id: 'sum', fieldName: 'Sum Value' },
  ]

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      filter: [this.filterFields[3].id]
    })
    this.sub.sink = this.filterForm.valueChanges.pipe(
      startWith(this.filterForm.value),
      distinctUntilChanged(),
      pluck('filter'),
      tap((filter) => this.filterChanged.emit(filter))
    ).subscribe()
  }

}
