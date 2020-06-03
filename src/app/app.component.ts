/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils';

@Component({
  selector: 'app-bootstrap',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    // this.analytics.trackPageViews();
  }
}
