import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyClubComponent } from './my-club/my-club.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NbCardModule, NbListModule } from '@nebular/theme';
import { StoreModule } from '@ngrx/store';
import * as fromClub from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ClubEffects } from './club.effects';
import { ListOfPostsComponent } from './my-club/list-of-posts/list-of-posts.component';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { PostEntityService } from './services/post-entity.service';
import { PostDataService } from './services/post-data.service';
import { Post } from './models/post.model';
import { BannerOfClubComponent } from './my-club/banner-of-club/banner-of-club.component';
import { NewsPostComponent } from './my-club/list-of-posts/news-post/news-post.component';
import { NewsPostPlaceholderComponent } from './my-club/list-of-posts/news-post-placeholder/news-post-placeholder.component';


const entityMetadata: EntityMetadataMap = {
  Posts: {
    selectId: (post: Post) => post._id
  }
}

@NgModule({
  declarations: [
    MyClubComponent,
    MyClubComponent
    , ListOfPostsComponent,
    BannerOfClubComponent,
    NewsPostComponent,
    NewsPostPlaceholderComponent],
  imports: [
    CommonModule,
    ThemeModule,
    NbCardModule,
    StoreModule.forFeature(fromClub.clubFeatureKey, fromClub.clubReducer),
    EffectsModule.forFeature([ClubEffects]),
    NbListModule,
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
