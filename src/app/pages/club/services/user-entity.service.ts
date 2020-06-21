import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { User } from '../../../models/user.model';


@Injectable()
export class UserEntityService extends EntityCollectionServiceBase<User> {

  constructor(private serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Users', serviceElementsFactory)
  }
}
