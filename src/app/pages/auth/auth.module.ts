import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NbAuthModule } from '@nebular/auth';
import { NbCardModule, NbLayoutModule } from '@nebular/theme';

const COMPONENTS = [LoginComponent]

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    NbAuthModule,
    NbCardModule,
    NbLayoutModule
  ],
  exports: COMPONENTS
})
export class AuthModule {
}
