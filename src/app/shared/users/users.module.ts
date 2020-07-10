import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsersReducer from './users.reducer';
import { UsersEffects } from './users.effects'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromUsersReducer.usersFeatureKey, fromUsersReducer.reducer),
    EffectsModule.forFeature([UsersEffects]),
  ]
})
export class UsersModule {
}
