import { NgModule } from '@angular/core';
import {
  NbCardModule,
  NbIconModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbTabsetModule,
  NbUserModule
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ClubModule } from './club/club.module';
import { AuthModule } from './auth/auth.module';
import { ListOfUsersComponent } from './list-of-users/list-of-users.component';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MessagesModule } from '../shared/messages/messages.module';

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        NbMenuModule,
        DashboardModule,
        ClubModule,
        AuthModule,
        NbLayoutModule,
        NbCardModule,
        NbTabsetModule,
        NbListModule,
        NbUserModule,
        NbIconModule,
        SharedModule,
        DragDropModule,
        MessagesModule
    ],
  declarations: [
    PagesComponent,
    ListOfUsersComponent,
  ],
})
export class PagesModule {
}
