import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ValuesBySportTypeWithDayRange } from '../../../../shared/models/starava.models';
import { LineChartConfig } from '../../../../shared/services/training-charts.service';
import * as moment from 'moment'

@Component({
  selector: 'ngx-detailed-sport-type-statistic',
  templateUrl: './detailed-sport-type-statistic.component.html',
  styleUrls: ['./detailed-sport-type-statistic.component.scss']
})
export class DetailedSportTypeStatisticComponent implements OnInit, OnChanges {
  @Input() trainingValueBySportType: ValuesBySportTypeWithDayRange[]
  @Input() user: string
  mappedTrainingValueBySportType: { graphName: string, chartConfig: LineChartConfig }[]

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.mappedTrainingValueBySportType = this.trainingValueBySportType
      .map<{ graphName: string, chartConfig: LineChartConfig }>((el) => {
        return {
          graphName: el.trainingDimensionName,
          chartConfig: {
            date: {
              startDate: moment().subtract(10, 'y').format(),
              endDate: moment().format(),
            },
            usersData: [
              {
                user: this.user,
                activities: el.valuesByTrainingDimensionName
              }
            ]
          }
        }
      })
  }

}
