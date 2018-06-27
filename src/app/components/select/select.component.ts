import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputModel } from '../../models/Input.model';

@Component({
  selector: 'ge-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent {
  @Input() model: InputModel;

  @Output() addOption = new EventEmitter();
  @Output() updateOption = new EventEmitter();
  @Output() deleteOption = new EventEmitter();
}
