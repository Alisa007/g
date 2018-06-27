import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputModel } from '../../models/Input.model';

@Component({
  selector: 'ge-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent {
  @Input() model: InputModel;

  @Output() addOption = new EventEmitter();
  @Output() updateOption = new EventEmitter();
  @Output() deleteOption = new EventEmitter();
}
