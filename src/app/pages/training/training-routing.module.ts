import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { MyTrainingComponent } from './my-training/my-training.component';
import { StravaResolver } from './shared/strava.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MyTrainingComponent
      },
      {
        path: 'strava',
        component: MyTrainingComponent,
        resolve: {
          strava: StravaResolver
        }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule {
}
