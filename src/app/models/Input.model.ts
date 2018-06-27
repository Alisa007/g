import { InputTypeEnum } from '../enums/InputType.enum';
import { ErrorTypeEnum } from '../enums/ErrorType.enum';

export class InputModel {
  label: string;
  type: InputTypeEnum;
  value: any;
  canEdit: boolean;
  canDelete: boolean;
  isRequired: boolean;
  errorType: ErrorTypeEnum;
  options?: string[];
}
