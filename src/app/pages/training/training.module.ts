import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTrainingComponent } from './my-training/my-training.component';
import { EffectsModule } from '@ngrx/effects';
import { TrainingEffects } from './shared/training.effects';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingBannerComponent } from './my-training/training-banner/training-banner.component';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [MyTrainingComponent, TrainingBannerComponent],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    EffectsModule.forFeature([TrainingEffects]),
    NbCardModule,
    NbButtonModule,
    RouterModule
  ]
})
export class TrainingModule { }
