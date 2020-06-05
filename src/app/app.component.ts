/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
// import Quill from 'quill';
//
// // add image resize module
// import ImageResize from 'quill-image-resize-module';
// Quill.register('modules/imageResize', ImageResize);
@Component({
  selector: 'ngx-bootstrap',
  template: '<router-outlet></router-outlet>',
})

export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
