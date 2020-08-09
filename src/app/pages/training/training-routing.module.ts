import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { MyTrainingComponent } from './my-training/my-training.component';
import { StravaResolver } from './shared/resolvers/strava.resolver';
import { ActivitiesResolver } from './shared/resolvers/activities.resolver';
import { SportServicesComponent } from './sport-services/sport-services.component';
import { MyTrainingDeactivateGuard } from './shared/guards/my-training-deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'my-training',
        component: MyTrainingComponent,
        resolve: {
          bannerInfo: ActivitiesResolver
        },
        canDeactivate:[MyTrainingDeactivateGuard]
      },
      {
        path: 'sport-services',
        children: [
          {
            path: '',
            component: SportServicesComponent,
          },
          {
            path: 'strava',
            component: SportServicesComponent,
            resolve: {
              strava: StravaResolver
            }
          }
        ]
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
