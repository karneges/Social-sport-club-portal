import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ngx-training-banner',
  templateUrl: './training-banner.component.html',
  styleUrls: ['./training-banner.component.scss']
})
export class TrainingBannerComponent implements OnInit {
  trainName = 'My Awesome Train'
  STRAVA_URL = environment.STRAVA_AUTH_URL
  params$: Observable<Params>

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.params$ = this.activatedRoute.queryParams
    this.params$.pipe(
      tap(p => console.log(p))
   ).subscribe()
  }

  routeSubscription() {

  }

}
