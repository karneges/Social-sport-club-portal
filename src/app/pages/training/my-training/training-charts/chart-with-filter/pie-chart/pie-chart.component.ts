import {
  Component,
  Input, OnChanges,
  OnInit, SimpleChanges,
} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { EChartOption } from 'echarts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PieEchartChartModel } from '../../models/pie-echart.model';

const getSeries = (data, echarts, isDoble: boolean) => {
  const oneSeries = {
    name: 'Countries',
    type: 'pie',
    radius: '70%',
    center: ['75%', '50%'],
    data,
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: echarts.itemHoverShadowColor,
      },
    },
    label: {
      normal: {
        textStyle: {
          color: echarts.textColor,
        },
      },
    },
    labelLine: {
      normal: {
        lineStyle: {
          color: echarts.axisLineColor,
        },
      },
    },
  }
  return isDoble
    ? [{ ...oneSeries, center: ['75%', '50%'] }, { ...oneSeries, center: ['25%', '50%'] }]
    : [{ ...oneSeries, center: ['50%', '50%'] }]
}


@Component({
  selector: 'ngx-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnChanges {


  @Input() activities: PieEchartChartModel
  options$: Observable<EChartOption>;

  constructor(private theme: NbThemeService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.activities) {
      return
    }
    this.options$ = this.theme.getJsTheme().pipe(
      map(({ variables }) => {
        const { echarts } = variables
        return this.getChartConfig(variables, this.activities, echarts)
      }),
    )
  }


  getChartConfig(colors, { data, chartTitle }: PieEchartChartModel, echarts): EChartOption {
    return {
      backgroundColor: echarts.bg,
      color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
      tooltip: {
        trigger: 'item',
        position: ['0', '10%'],
        formatter: `{b} <br/> {c0} ({d0}%)`,
      },
      title: {
        text: chartTitle,
        left: 'center',
        textStyle: {
          color: '#f8f8f8'
        }
      },
      legend: {
        left: 'center',
        top: 'bottom',
        // data: this.activities,
        textStyle: {
          color: echarts.textColor,
        },
      },
      series: [
        {
          type: 'pie',
          radius: '40%',
          center: ['50%', '50%'],
          data: data.filter(one => !!one.value),
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: echarts.itemHoverShadowColor,
            },
          },
          label: {
            normal: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
          },
          animationType: 'scale'
        }
      ]
    };
  }
}


