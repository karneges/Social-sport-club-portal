import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { EChartOption } from 'echarts';
import { Observable } from 'rxjs';
import { LineChartConfig, TrainingChartsService } from '../../../shared/services/training-charts.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-training-line-chart',
  templateUrl: './training-line-chart.component.html',
  styleUrls: ['./training-line-chart.component.scss']
})
export class TrainingLineChartComponent implements OnInit, OnChanges {
  @Input() private lineChartConfig: LineChartConfig
  options$: Observable<EChartOption>

  constructor(private theme: NbThemeService, private trainingChartsService: TrainingChartsService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.options$ = this.theme.getJsTheme().pipe(
      map((config) => {
        return this.trainingChartsService.getLineChartConfig(config, this.lineChartConfig)
      })
    )
  }

}
