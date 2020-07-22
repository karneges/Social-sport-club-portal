import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input, OnChanges,
  OnInit, SimpleChanges,
} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { EChartOption } from 'echarts';
import { combineLatest, Observable, of, interval, Subject } from 'rxjs';
import { delay, finalize, first, map, startWith, tap } from 'rxjs/operators';
import { PieEchartChartModel, PieEchartInterface } from '../../models/pie-echart.model';

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
  // changeDetection: ChangeDetectionStrategy.OnPush
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
        formatter: '{a} <br/>{b} : {c} ({d}%)',
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
          name: 'Countries',
          type: 'pie',
          radius: '70%',
          center: ['50%', '50%'],
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
          animationType: 'scale'
        }
      ]
    };
  }
}


