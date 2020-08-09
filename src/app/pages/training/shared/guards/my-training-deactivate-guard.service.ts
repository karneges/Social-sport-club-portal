import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { TrainingActions } from '../training.actions';
import { first } from 'rxjs/operators';

@Injectable()
export class MyTrainingDeactivateGuard implements CanDeactivate<any> {
  constructor(private store: Store) {
  }
  canDeactivate(component: any,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> {
    this.store.dispatch(TrainingActions.removeAllTrainingData())
    return of(true).pipe(first())
  }

}
