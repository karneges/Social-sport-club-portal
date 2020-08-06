import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  StravaActivitiesByTrainingValuesDayRange,
  ValuesBySportTypeWithDayRange
} from '../../../../shared/models/starava.models';
import { LineChartConfig } from '../../../../shared/services/training-charts.service';
import * as moment from 'moment'
import { convertArrayToObject } from '../../../../../../shared/messages/utils/conver-array-to-object';
import { SportValuesFilterMap } from '../../../../shared/models/Strava-filter-map';

@Component({
  selector: 'ngx-detailed-sport-type-statistic',
  templateUrl: './detailed-sport-type-statistic.component.html',
  styleUrls: ['./detailed-sport-type-statistic.component.scss']
})
export class DetailedSportTypeStatisticComponent implements OnInit, OnChanges {
  @Input() trainingValueBySportType: StravaActivitiesByTrainingValuesDayRange[]
  @Input() sportType: string
  @Input() dateConfig: { startDate: string, endDate: string }
  mappedTrainingValueBySportType: LineChartConfigWithChartName[]

  constructor() {
  }

  ngOnInit(): void {
    console.log('obne row init')
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.mappedTrainingValueBySportType = this.trainingValueBySportType
      .reduce<LineChartConfigWithChartName[]>((acc, nextValue) => {
        const filteredActivitiesByType = this.getValuesByType(nextValue.userActivities)
        if (acc?.length === 0) {
          // if this is first iteration ,need fill initial object structure
          if (filteredActivitiesByType) {
            return filteredActivitiesByType.map(valueBySportTypeDayRange => (
                {
                  chartName: valueBySportTypeDayRange.trainingDimensionName,
                  chartConfig: {
                    date: {
                      startDate: this.dateConfig.startDate,
                      endDate: this.dateConfig.endDate,
                    },
                    usersData: [
                      {
                        user: nextValue.user,
                        activities: valueBySportTypeDayRange.valuesByTrainingDimensionName
                      }
                    ]
                  }
                }
              )
            )
          }
        } else {
          // if this is not first iteration ,need update user data
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
            return acc?.map<LineChartConfigWithChartName>((chartConfigWithChartName) => {
                const { chartConfig, chartName } = chartConfigWithChartName
                return {
                  ...chartConfigWithChartName,
                  chartConfig: {
                    ...chartConfig,
                    usersData: [...chartConfigWithChartName.chartConfig.usersData, activitiesBySportTypeMap[chartName]?.userData]
                  }
                }
              }
            )
          }
        }
      }, [])
  }

  private getValuesByType(userActivities): ValuesBySportTypeWithDayRange[] {
    return userActivities.find(activityByType => activityByType.type === this.sportType)?.valuesByType
  }

  getChartName(chartName: string) {
    return SportValuesFilterMap[chartName]
  }
}

export interface LineChartConfigWithChartName {
  chartName: string,
  chartConfig: LineChartConfig
}
