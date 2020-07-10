import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { EffectsModule } from '@ngrx/effects';
import { MessagesEffects } from './messages.effects';
import { StoreModule } from '@ngrx/store';
import * as fromMessageReducer from './messages.reducer';
import { NbChatModule, NbIconModule } from '@nebular/theme';


const COMPONENTS = [ChatComponent]

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    StoreModule.forFeature(fromMessageReducer.messagesFeatureKey, fromMessageReducer.reducer),
    EffectsModule.forFeature([MessagesEffects]),
    NbChatModule,
    NbIconModule
  ],
  exports: COMPONENTS
})
export class MessagesModule {
}
