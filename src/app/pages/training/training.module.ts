import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTrainingComponent } from './my-training/my-training.component';
import { EffectsModule } from '@ngrx/effects';
import { TrainingEffects } from './shared/training.effects';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingBannerComponent } from './my-training/training-banner/training-banner.component';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule, NbInputModule, NbOptionModule,
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



@NgModule({
  declarations: [MyTrainingComponent,
    TrainingBannerComponent,
    TrainingFiltersComponent,
    TrainingChartsComponent],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    EffectsModule.forFeature([TrainingEffects]),
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
    ReactiveFormsModule
  ]
})
export class TrainingModule { }
