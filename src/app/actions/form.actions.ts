import {Injectable} from '@angular/core';

export const ADD_FIELD = 'ADD_FIELD';
export const REMOVE_FIELD = 'REMOVE_FIELD';
export const ADD_INPUTS = 'ADD_INPUTS';
export const UPDATE_LABEL = 'UPDATE_LABEL';
export const UPDATE_VALUE = 'UPDATE_VALUE';
export const REQUIRE_INPUT = 'REQUIRE_INPUT';
export const UNREQUIRE_INPUT = 'UNREQUIRE_INPUT';
export const ADD_OPTION = 'ADD_OPTION';
export const UPDATE_OPTION = 'UPDATE_OPTION';
export const DELETE_OPTION = 'DELETE_OPTION';

@Injectable()
export class FormActions {
  addField(formField) {
    return {
     type: ADD_FIELD,
     payload: formField,
    };
  }

  removeField(formField) {
    return {
      type: REMOVE_FIELD,
      payload: formField,
    };
  }

  addInputs(inputs) {
    return {
      type: ADD_INPUTS,
      payload: inputs,
    };
  }

  updateLabel(index, label) {
    return {
      type: UPDATE_LABEL,
      payload: { index, label },
    };
  }

  updateValue(index, value) {
    return {
      type: UPDATE_VALUE,
      payload: { index, value },
    };
  }

  requireInput(index) {
    return {
      type: REQUIRE_INPUT,
      payload: index,
    };
  }

  unrequireInput(index) {
    return {
      type: UNREQUIRE_INPUT,
      payload: index,
    };
  }

  addOption(inputIndex, option) {
    return {
      type: ADD_OPTION,
      payload: { inputIndex, option },
    };
  }

  updateOption(inputIndex, optionIndex, option) {
    return {
      type: UPDATE_OPTION,
      payload: { inputIndex, optionIndex, option },
    };
  }

  deleteOption(inputIndex, optionIndex) {
    return {
      type: DELETE_OPTION,
      payload: { inputIndex, optionIndex },
    };
  }
}
