/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';
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

  constructor(private iconLibraries: NbIconLibraries, private iconsLibrary: NbIconLibraries, private store: Store<AppState>) {
    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fa', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('regular', { packClass: 'far', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('solid', { packClass: 'fas', iconClassPrefix: 'fa' });
    this.iconsLibrary.registerSvgPack('mySportIcons', { 'gym': '<img src="../assets/images/gym.svg">', })

  }

  ngOnInit() {
  }
}
