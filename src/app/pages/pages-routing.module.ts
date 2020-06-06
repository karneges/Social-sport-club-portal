import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { MyClubComponent } from './club/my-club/my-club.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'general',
      component: MyClubComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    { path: '', redirectTo: 'general', pathMatch: 'full' },
  ],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
