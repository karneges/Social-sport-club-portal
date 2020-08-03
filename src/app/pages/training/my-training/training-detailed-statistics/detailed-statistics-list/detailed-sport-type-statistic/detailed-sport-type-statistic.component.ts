import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StravaActivitiesByTrainingValuesDayRange } from '../../../../shared/models/starava.models';
import { LineChartConfig } from '../../../../shared/services/training-charts.service';
import * as moment from 'moment'
import { convertArrayToObject } from '../../../../../../shared/messages/utils/conver-array-to-object';

@Component({
  selector: 'ngx-detailed-sport-type-statistic',
  templateUrl: './detailed-sport-type-statistic.component.html',
  styleUrls: ['./detailed-sport-type-statistic.component.scss']
})
export class DetailedSportTypeStatisticComponent implements OnInit, OnChanges {
  @Input() trainingValueBySportType: StravaActivitiesByTrainingValuesDayRange[]
  @Input() sportType: string
  mappedTrainingValueBySportType: LineChartConfigWithChartName[]

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.mappedTrainingValueBySportType = this.trainingValueBySportType
      .reduce<LineChartConfigWithChartName[]>((acc, nextValue) => {
        if (acc.length === 0) {
          return nextValue.userActivities
            .find(el => el.type === this.sportType)
            .valuesByType
            .map(el => (
                {
                  chartName: el.trainingDimensionName,
                  chartConfig: {
                    date: {
                      startDate: moment().subtract(10, 'y').format(),
                      endDate: moment().format(),
                    },
                    usersData: [
                      {
                        user: nextValue.user,
                        activities: el.valuesByTrainingDimensionName
                      }
                    ]
                  }
                }
              )
            )
        } else {
          const filteredActivitiesByType = nextValue.userActivities
            .find(activities => activities.type === this.sportType)?.valuesByType
          if (filteredActivitiesByType) {
            const activitiesBySportTypeArr = filteredActivitiesByType
              .map(({ trainingDimensionName, valuesByTrainingDimensionName }) => ({
                trainingDimensionName,
                userData: {
                  user: nextValue.user,
                  activities: valuesByTrainingDimensionName
                }
              }))

            const activitiesBySportTypeMap = convertArrayToObject(activitiesBySportTypeArr, 'trainingDimensionName')
            return acc.map<LineChartConfigWithChartName>((chartConfigWithChartName) => {
                const { chartConfig, chartName } = chartConfigWithChartName
                return {
                  ...chartConfigWithChartName,
                  chartConfig: {
                    ...chartConfig,
                    usersData: [...chartConfigWithChartName.chartConfig.usersData, activitiesBySportTypeMap[chartName].userData]
                  }
                }
              }
            )
          }
        }
      }, [])
    // .map<LineChartConfigWithChartName>((el) => {
    //   const initialConfig: LineChartConfigWithChartName = {
    //     chartName: el.trainingDimensionName,
    //     chartConfig: {
    //       date: {
    //         startDate: moment().subtract(10, 'y').format(),
    //         endDate: moment().format(),
    //       },
    //       usersData: [
    //         {
    //           user: this.user,
    //           activities: el.valuesByTrainingDimensionName
    //         }
    //       ]
    //     }
    //   }
    // })
    debugger
  }


}

export interface LineChartConfigWithChartName {
  chartName: string,
  chartConfig: LineChartConfig
}
