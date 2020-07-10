import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Event } from '../../../models/event.model';


@Injectable()
export class EventEntityService extends EntityCollectionServiceBase<Event> {

  constructor(private serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Events', serviceElementsFactory)
  }
}
