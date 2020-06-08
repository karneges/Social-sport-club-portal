import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NbAuthModule } from '@nebular/auth';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbLayoutModule } from '@nebular/theme';
import { StoreModule } from '@ngrx/store';
import * as fromAuthReducer from './auth.reducer'
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [LoginComponent]

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    NbAuthModule,
    NbCardModule,
    NbLayoutModule,
    NbCheckboxModule,
    StoreModule.forFeature(fromAuthReducer.authFeatureKey, fromAuthReducer.reducer),
    EffectsModule.forFeature([AuthEffects]),
    NbInputModule,
    NbButtonModule,
    ReactiveFormsModule
  ],
  exports: COMPONENTS
})
export class AuthModule {
}
