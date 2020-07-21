import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { MyTrainingComponent } from './my-training/my-training.component';
import { StravaResolver } from './shared/resolvers/strava.resolver';
import { ActivitiesResolver } from './shared/resolvers/activities.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MyTrainingComponent,
        resolve: {
          bannerInfo: ActivitiesResolver
        }
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
