import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { InputTypeEnum } from './enums/InputType.enum';
import { InputModel } from './models/Input.model';
import { FormActions } from './actions/form.actions';

interface AppState {
  form: {
    inputs: InputModel[],
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  form: any;

  inputs$: Observable<InputModel[]>;

  constructor(private store: Store<AppState>, private formActions: FormActions) {
    this.setInputs();
    this.inputs$ = store.select(form => form.form.inputs);
  }

  addField(formField) {
    this.store.dispatch(this.formActions.addField(formField));
  }

  removeField(formField) {
    this.store.dispatch(this.formActions.removeField(formField));
  }

  validate(index) {
    this.store.dispatch(this.formActions.validate(index));
  }

  setInputs() {
    this.store.dispatch(this.formActions.addInputs(InputTypeEnum));
  }

  updateLabel(index, label) {
    this.store.dispatch(this.formActions.updateLabel(index, label));
  }

  updateValue(index, value) {
    this.store.dispatch(this.formActions.updateValue(index, value));
  }

  require(index) {
    this.store.dispatch(this.formActions.requireInput(index));
  }

  unrequire(index) {
    this.store.dispatch(this.formActions.unrequireInput(index));
  }

  addOption(index, option) {
    this.store.dispatch(this.formActions.addOption(index, option));
  }

  updateOption(inputIndex, { optionIndex, option }) {
    this.store.dispatch(this.formActions.updateOption(inputIndex, optionIndex, option));
  }

  deleteOption(inputIndex, optionIndex) {
    this.store.dispatch(this.formActions.deleteOption(inputIndex, optionIndex));
  }
}
