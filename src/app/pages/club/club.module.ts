import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyClubComponent } from './my-club/my-club.component';
import { ThemeModule } from '../../@theme/theme.module';
import {
  NbButtonModule,
  NbCardModule,
  NbChatModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule, NbStepperModule, NbTooltipModule
} from '@nebular/theme';
import { StoreModule } from '@ngrx/store';
import * as fromClub from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ClubEffects } from './club.effects';
import { ListOfPostsComponent } from './my-club/list-of-posts/list-of-posts.component';
import {
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap
} from '@ngrx/data';
import { PostEntityService } from './services/post-entity.service';
import { PostDataService } from './services/post-data.service';
import { Post } from './models/post.model';
import { BannerOfClubComponent } from './my-club/banner-of-club/banner-of-club.component';
import { SinglePostComponent } from './my-club/list-of-posts/single-post/single-post.component';
import { NewsPostPlaceholderComponent } from './my-club/list-of-posts/news-post-placeholder/news-post-placeholder.component';
import { AddPostComponent } from './my-club/add-post/add-post.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { dateComparer } from '../../../utils/utils';
import { SharedModule } from '../../shared/shared.module';
import { NbAuthModule } from '@nebular/auth';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteListModule } from 'angular-infinite-list';
import { EventStepperComponent } from './my-club/event-stepper/event-stepper.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


const entityMetadata: EntityMetadataMap = {
  Posts: {
    selectId: (post: Post) => post._id,
    sortComparer: dateComparer
  }
}

@NgModule({
  declarations: [
    MyClubComponent,
    MyClubComponent
    , ListOfPostsComponent,
    BannerOfClubComponent,
    SinglePostComponent,
    NewsPostPlaceholderComponent,
    AddPostComponent,
    EventStepperComponent],
  imports: [
    CommonModule,
    InfiniteListModule,
    SharedModule,
    ThemeModule,
    NbCardModule,
    StoreModule.forFeature(fromClub.clubFeatureKey, fromClub.clubReducer),
    EffectsModule.forFeature([ClubEffects]),
    NbListModule,
    NbFormFieldModule,
    NbIconModule,
    NbInputModule,
    QuillModule,
    NbChatModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbAuthModule,
    ScrollingModule,
    NbStepperModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NbTooltipModule
  ],
  exports: [MyClubComponent],
  providers: [PostEntityService, PostDataService]
})
export class ClubModule {
  constructor(private eds: EntityDefinitionService,
              private entityDataService: EntityDataService,
              private postDataService: PostDataService) {
    eds.registerMetadataMap(entityMetadata)
    this.entityDataService.registerService('Posts', postDataService)
  }
}
