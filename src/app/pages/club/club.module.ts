import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyClubComponent } from './my-club/my-club.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [MyClubComponent, MyClubComponent],
    imports: [
        CommonModule,
        ThemeModule,
        NbCardModule,
    ],
  exports: [ MyClubComponent ],
})
export class ClubModule {
}
