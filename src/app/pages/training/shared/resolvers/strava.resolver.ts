import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TrainingService } from '../services/training.service';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StravaResolver implements Resolve<any> {
  constructor(private trainingService: TrainingService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if ('code' in route.queryParams) {
      return this.trainingService.onUserConnectStravaAccount(route.queryParams.code)
    }
  }

}
