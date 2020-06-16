import { AfterContentInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbStepComponent } from '@nebular/theme';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-event-stepper',
  templateUrl: './event-stepper.component.html',
  styleUrls: ['./event-stepper.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class EventStepperComponent implements OnInit {
  constructor() {}

  ngOnInit() {
  }

}
