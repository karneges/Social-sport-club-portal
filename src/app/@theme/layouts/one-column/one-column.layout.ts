import { Component } from '@angular/core';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive start>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <div class="row">
            <div class="col-md-12 col-lg-8 col-xxxl-9">
            <ng-content select="router-outlet"></ng-content>
          </div>
          <div class="col-lg-4 col-xxxl-3">
            <div class="sticky-top">
              <ng-content></ng-content>
            </div>
          </div>
        </div>

      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {
}
