import { Injectable } from '@angular/core';
import * as moment from 'moment'
import { NbJSThemeOptions } from '@nebular/theme';
import { ActivityFromDateAndValue } from '../models/starava.models';
import { EChartOption } from 'echarts';
import { convertArrayToObject } from '../../../../shared/messages/utils/conver-array-to-object';


export interface LineChartConfig {
  date: {
    startDate: string,
    endDate: string
  },
  usersData: {
    user: string
    activities: ActivityFromDateAndValue[]
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class TrainingChartsService {
  private dateBarriers: {
    startDate: string,
    endDate: string
  }
  private dayRangeArray: string[]

  constructor() {
  }

  getDateArray(startDate: string, endDate: string): string[] {
    if (this.dateBarriers && this.dateBarriers.endDate === endDate && this.dateBarriers.startDate === startDate) {
      return this.dayRangeArray
    }
    this.dateBarriers = {
      endDate,
      startDate
    }
    const diffDays = moment(endDate).diff(startDate) / (1000 * 3600 * 24)
    this.dayRangeArray = Array(diffDays)
      .fill(1)
      .map((el, idx) => moment(startDate)
        .add(idx + 1, 'd')
        .format('MM-DD-YYYY'))
    return this.dayRangeArray
  }

  getLineChartConfig(config: NbJSThemeOptions, data: LineChartConfig): EChartOption {
    const colors: any = config.variables
    const echarts: any = config.variables.echarts
    const conf = {
      // backgroundColor: echarts.bg,
      // // dataZoom: [
      // //   {
      // //     show: true,
      // //     realtime: true,
      // //     start: 0,
      // //     end: 70,
      // //     xAxisIndex: [0, 1]
      // //   },
      // //   {
      // //     type: 'inside',
      // //     realtime: true,
      // //     start: 0,
      // //     end: 70,
      // //     xAxisIndex: [0, 1]
      // //   }
      // // ],
      // color: [colors.primary, colors.success],
      // tooltip: {
      //   trigger: 'none',
      //   axisPointer: {
      //     type: 'cross',
      //   },
      // },
      // legend: {
      //   data: data.usersData.map(({ user }) => user),
      //   textStyle: {
      //     color: echarts.textColor,
      //   },
      // },
      // grid: {
      //   top: 70,
      //   bottom: 50,
      // },
      // xAxis: [
      //   {
      //     type: 'category',
      //     axisTick: {
      //       alignWithLabel: true,
      //     },
      //     axisLine: {
      //       onZero: false,
      //       lineStyle: {
      //         color: colors.info
      //       },
      //     },
      //     axisPointer: {
      //       label: {
      //         formatter: params => {
      //           return (
      //             'Precipitation  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
      //           );
      //         },
      //       },
      //     },
      //     data: this.getDateArray(data.date.startDate, data.date.endDate)
      //   },
      //   {
      //     type: 'category',
      //   },
      // ],
      //
      // yAxis: [
      //   {
      //     type: 'value',
      //     axisLine: {
      //       lineStyle: {
      //         color: echarts.axisLineColor,
      //       },
      //     },
      //     splitLine: {
      //       lineStyle: {
      //         color: echarts.splitLineColor,
      //       },
      //     },
      //   },
      // ],
      // series: data.usersData.map(({ user, activities }) => {
      //   const activitiesWithDateFormat = activities.map(activ => ({
      //     ...activ,
      //     date: moment(activ.date).format('MM-DD-YYYY')
      //   }))
      //   // Create hash map from activities array with "date" as key
      //   const convertedActivitiesToArr = convertArrayToObject(activitiesWithDateFormat, 'date')
      //
      //   return {
      //     name: user,
      //     type: 'line',
      //     xAxisIndex: 1,
      //     smooth: true,
      //     /*
      //     Map date array
      //      If has activities with current, date change it on activity value.
      //      Else change on 0
      //      */
      //     data: this.getDateArray(data.date.startDate, data.date.endDate).map(oneDay => {
      //       return convertedActivitiesToArr[oneDay]
      //         ? convertedActivitiesToArr[oneDay].value
      //         : 0
      //     })
      //   }
      // })
      backgroundColor: echarts.bg,
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross'
        }
      },
      dataZoom: [
        {
            show: true,
            realtime: true,
            start: 0,
            end: 70,
            xAxisIndex: [0, 1]
        },
        {
          type: 'inside',
          realtime: true,
          start: 0,
          end: 70,
          xAxisIndex: [0, 1]
        }
      ],
      color: [colors.primary, colors.success],
      legend: {
        data: data.usersData.map(({ user }) => user),
        textStyle: {
          color: echarts.textColor,
        },
      },
      grid: {
        top: 70,
        bottom: 50
      },
      xAxis: [
        {
          type: 'category'
        },
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: colors.info
                },
              },
          axisPointer: {
            label: {
              formatter: function (params) {
                return '降水量  ' + params.value
                  + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
              }
            }
          },
          data: this.getDateArray(data.date.startDate, data.date.endDate)
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: echarts.axisLineColor,
            },
          },
          splitLine: {
            lineStyle: {
              color: echarts.splitLineColor,
            },
          },
        },
      ],
      series: data.usersData.map(({ user, activities }) => {
        const activitiesWithDateFormat = activities.map(activ => ({
          ...activ,
          date: moment(activ.date).format('MM-DD-YYYY')
        }))
        // Create hash map from activities array with "date" as key
        const convertedActivitiesToArr = convertArrayToObject(activitiesWithDateFormat, 'date')

        return {
          name: user,
          type: 'line',
          xAxisIndex: 1,
          smooth: true,
          /*
          Map date array
           If has activities with current, date change it on activity value.
           Else change on 0
           */
          data: this.getDateArray(data.date.startDate, data.date.endDate).map(oneDay => {
            return convertedActivitiesToArr[oneDay]
              ? convertedActivitiesToArr[oneDay].value
              : 0
          })
        }
      })
    };
    debugger
    return conf
  }
}
