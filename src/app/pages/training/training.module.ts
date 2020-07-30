import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTrainingComponent } from './my-training/my-training.component';
import { EffectsModule } from '@ngrx/effects';
import { TrainingEffects } from './shared/training.effects';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingBannerComponent } from './my-training/training-banner/training-banner.component';
import {
    NbAccordionModule,
    NbButtonModule,
    NbCardModule,
    NbDatepickerModule, NbIconModule, NbInputModule, NbOptionModule,
    NbProgressBarModule, NbSelectModule,
    NbTooltipModule,
    NbUserModule
} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { TrainingFiltersComponent } from './my-training/training-filters/training-filters.component';
import { TrainingChartsComponent } from './my-training/training-charts/training-charts.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-chartjs';
import { NgxEchartsCoreModule } from 'ngx-echarts/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { PieChartComponent } from './my-training/training-charts/chart-with-filter/pie-chart/pie-chart.component';
import { ChartWithFilterComponent } from './my-training/training-charts/chart-with-filter/chart-with-filter.component';
import { ChartFilterComponent } from './my-training/training-charts/chart-with-filter/chart-filter/chart-filter.component';
import { StoreModule } from '@ngrx/store';
import * as fromTraining from './shared/training.reducer';
import { TrainingDetailedStatisticsComponent } from './my-training/training-detailed-statistics/training-detailed-statistics.component';
import { TrainingLineChartComponent } from './my-training/training-detailed-statistics/training-line-chart/training-line-chart.component';
import { SportServicesComponent } from './sport-services/sport-services.component';
import { DetailedStatisticsListComponent } from './my-training/training-detailed-statistics/detailed-statistics-list/detailed-statistics-list.component';
import { DetailedSportTypeStatisticComponent } from './my-training/training-detailed-statistics/detailed-statistics-list/detailed-sport-type-statistic/detailed-sport-type-statistic.component'


@NgModule({
  declarations: [MyTrainingComponent,
    TrainingBannerComponent,
    TrainingFiltersComponent,
    TrainingChartsComponent,
    PieChartComponent,
    ChartWithFilterComponent,
    ChartFilterComponent,
    TrainingDetailedStatisticsComponent,
    TrainingLineChartComponent,
    SportServicesComponent,
    DetailedStatisticsListComponent,
    DetailedSportTypeStatisticComponent],
    imports: [
        CommonModule,
        TrainingRoutingModule,
        EffectsModule.forFeature([TrainingEffects]),
        StoreModule.forFeature(fromTraining.trainingFeatureKey, fromTraining.reducer),
        NbCardModule,
        NbButtonModule,
        RouterModule,
        NbUserModule,
        NbProgressBarModule,
        NbTooltipModule,
        NbDatepickerModule,
        NbInputModule,
        NbOptionModule,
        NbSelectModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        ChartModule,
        NgxEchartsModule,
        NgxChartsModule,
        NbAccordionModule,
        NbIconModule,
    ]
})
export class TrainingModule {
}
