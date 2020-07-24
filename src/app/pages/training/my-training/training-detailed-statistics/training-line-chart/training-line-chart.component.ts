import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-training-line-chart',
  templateUrl: './training-line-chart.component.html',
  styleUrls: ['./training-line-chart.component.scss']
})
export class TrainingLineChartComponent implements OnInit, AfterViewInit, OnDestroy {

  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.success, colors.info],
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross',
          },
        },
        legend: {
          data: ['2015 Precipitation', '2016 Precipitation'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        grid: {
          top: 70,
          bottom: 50,
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors.info,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
            axisPointer: {
              label: {
                formatter: params => {
                  return (
                    'Precipitation  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                  );
                },
              },
            },
            data: [
              '2016-1',
              '2016-2',
              '2016-3',
              '2016-4',
              '2016-5',
              '2016-6',
              '2016-7',
              '2016-8',
              '2016-9',
              '2016-10',
              '2016-11',
              '2016-12',
              '2017-1',
              '2017-2',
              '2017-3',
              '2017-4',
              '2017-5',
              '2017-6',
              '2017-7',
              '2017-8',
              '2017-9',
              '2017-10',
              '2017-11',
              '2017-12',
              '2018-1',
              '2018-2',
              '2018-3',
              '2018-4',
              '2018-5',
              '2018-6',
              '2018-7',
              '2018-8',
              '2018-9',
              '2018-10',
              '2018-11',
              '2018-12',
            ],
          },
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors.success,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
            axisPointer: {
              label: {
                formatter: params => {
                  return (
                    'Precipitation  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                  );
                },
              },
            },
            data: [
              '2016-1',
              '2016-2',
              '2016-3',
              '2016-4',
              '2016-5',
              '2016-6',
              '2016-7',
              '2016-8',
              '2016-9',
              '2016-10',
              '2016-11',
              '2016-12',
              '2017-1',
              '2017-2',
              '2017-3',
              '2017-4',
              '2017-5',
              '2017-6',
              '2017-7',
              '2017-8',
              '2017-9',
              '2017-10',
              '2017-11',
              '2017-12',
              '2018-1',
              '2018-2',
              '2018-3',
              '2018-4',
              '2018-5',
              '2018-6',
              '2018-7',
              '2018-8',
              '2018-9',
              '2018-10',
              '2018-11',
              '2018-12',
            ],
          },
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
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: '2015 Precipitation',
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
          },
          {
            name: '2016 Precipitation',
            type: 'line',
            smooth: true,
            data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7,3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7,3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7],
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
