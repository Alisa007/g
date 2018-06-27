import { Component, Input } from '@angular/core';

import { ErrorTypeEnum } from '../../enums/ErrorType.enum';

@Component({
  selector: 'ge-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  get type(): ErrorTypeEnum {
    return this._type;
  }
  @Input() set type(value: ErrorTypeEnum) {
    const types = {
      [ErrorTypeEnum.Required]: 'Field is required',
      [ErrorTypeEnum.Unique]: 'Field must be unique',
      [ErrorTypeEnum.HasOptions]: 'Field mush have options',
      [ErrorTypeEnum.UniqueOptions]: 'Options must be unique',
    };

    this.isShown = this.type !== ErrorTypeEnum.None;
    this.res = types[value];
    this._type = value;
  }

  private _type: ErrorTypeEnum;
  isShown: boolean;
  res: string;
}
