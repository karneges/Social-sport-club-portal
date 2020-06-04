import { Inject, Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Post } from '../models/post.model';


@Injectable()
export class PostEntityService extends EntityCollectionServiceBase<Post> {

  constructor(private serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Posts', serviceElementsFactory)
  }

}
