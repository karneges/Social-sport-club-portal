import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../../../models/event.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-event-stepper',
  templateUrl: './event-stepper.component.html',
  styleUrls: ['./event-stepper.component.scss'],
})
export class EventStepperComponent implements OnInit {
  @Input() events$: Observable<Event[]>
  constructor() {}

  ngOnInit() {
  }

}
