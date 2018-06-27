import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InputTypeEnum } from '../../enums/InputType.enum';
import { InputModel } from '../../models/Input.model';

@Component({
  selector: 'ge-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less']
})
export class InputComponent {
  get model(): InputModel {
    return this._model;
  }
  @Input() set model(value: InputModel) {
    this.requiredInputModel = {
      label: 'is required',
      type: InputTypeEnum.Checkbox,
      value: value.isRequired,
    } as InputModel;

    this.labelInputModel = {
      type: InputTypeEnum.Text,
      label: 'label',
      isRequired: true,
      value: value.label,
    } as InputModel;

    this._model = value;
  }

  @Output() delete = new EventEmitter();
  @Output() modelChange = new EventEmitter();
  @Output() labelChange = new EventEmitter();
  @Output() require = new EventEmitter();
  @Output() unrequire = new EventEmitter();
  @Output() addOption = new EventEmitter();
  @Output() updateOption = new EventEmitter();
  @Output() deleteOption = new EventEmitter();
  @Output() validate = new EventEmitter();

  private _model: InputModel;
  inputTypeEnum = InputTypeEnum;
  requiredInputModel: InputModel;
  labelInputModel: InputModel;
}
