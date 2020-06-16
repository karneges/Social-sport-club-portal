import { NgModule } from '@angular/core';
import { NbCardModule, NbLayoutModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ClubModule } from './club/club.module';
import { AuthModule } from './auth/auth.module';
import { ListOfUsersComponent } from './list-of-users/list-of-users.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ClubModule,
    AuthModule,
    NbLayoutModule,
    NbCardModule
  ],
  declarations: [
    PagesComponent,
    ListOfUsersComponent,
  ],
})
export class PagesModule {
}
