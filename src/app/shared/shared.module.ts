import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { QuillModule } from 'ngx-quill';
import { modules } from '../../utils/quill-settings';
import { ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { UsersModule } from './users/users.module';

const SHARED_COMPONENTS = [EditorComponent]

@NgModule({
  declarations: [...SHARED_COMPONENTS],
  imports: [
    CommonModule,
    QuillModule.forRoot({
      modules: modules
    }),
    ReactiveFormsModule,
    NbButtonModule,
    UsersModule,
    NbCardModule,
  ],
  exports: SHARED_COMPONENTS
})
export class SharedModule { }
