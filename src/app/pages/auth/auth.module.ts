import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NbAuthModule } from '@nebular/auth';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbLayoutModule } from '@nebular/theme';

const COMPONENTS = [LoginComponent]

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    NbAuthModule,
    NbCardModule,
    NbLayoutModule,
    NbCheckboxModule,
    NbInputModule,
    NbButtonModule
  ],
  exports: COMPONENTS
})
export class AuthModule {
}
