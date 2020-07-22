import { Component, Input, OnInit } from '@angular/core';
import {
  ActivitiesStatisticValues,
  StravaActivitiesByTrainValues
} from '../../../shared/models/strava.request.model';
import { PieEchartChartModel } from '../models/pie-echart.model';
import { filterMap } from '../../../shared/models/Strava-filter-map';

@Component({
  selector: 'ngx-chart-with-filter',
  templateUrl: './chart-with-filter.component.html',
  styleUrls: ['./chart-with-filter.component.scss']
})
export class ChartWithFilterComponent implements OnInit {
  @Input() dataForChart: StravaActivitiesByTrainValues
  activityWithSelectedOption: PieEchartChartModel

  constructor() {
  }

  ngOnInit(): void {
  }

  onFilterChanged(filterValue: keyof ActivitiesStatisticValues) {
    this.activityWithSelectedOption = {
      data: this.dataForChart.sportTypes.map(el => {
        return { name: el.sportType, value: el[filterValue] }
      }),
      chartTitle: filterMap[this.dataForChart._id]
    }
  }
}
