import {
  ADD_FIELD,
  REMOVE_FIELD,
  ADD_INPUTS,
  UPDATE_LABEL,
  UPDATE_VALUE,
  REQUIRE_INPUT,
  UNREQUIRE_INPUT,
  ADD_OPTION,
  UPDATE_OPTION,
  DELETE_OPTION,
  VALIDATE,
} from '../actions/form.actions';
import { ErrorTypeEnum } from '../enums/ErrorType.enum';
import { InputTypeEnum } from '../enums/InputType.enum';

const update = Object.assign;
const getError = (index, inputs): ErrorTypeEnum => {
  const input = inputs[index];
  const notCurrent = (arr) => arr.filter(v => v.type !== input.type);

  if (input.isRequired && !input.value) {
    return ErrorTypeEnum.Required;
  }

  if (notCurrent(inputs).find(v => v.label === input.label)) {
    return  ErrorTypeEnum.Unique;
  }

  const canHaveOptions = (input.type === InputTypeEnum.Select) || (input.type === InputTypeEnum.Radio);

  if (canHaveOptions && !input.options.filter(v => v).length) {
    return  ErrorTypeEnum.HasOptions;
  }

  if (notCurrent(input.options).find(v => v === input.label)) {
    return ErrorTypeEnum.UniqueOptions;
  }

  return  ErrorTypeEnum.None;
};

export const formReducer = (state = { data: [], inputs: [] }, action) => {
  switch (action.type) {
    case ADD_FIELD: {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }
    case REMOVE_FIELD: {
      return {
        ...state,
        data: state.data.filter(field => field.label !== action.payload.label),
      };
    }
    case ADD_INPUTS: {
      const values = Object.values(action.payload);
      const typeArray = values
        .slice(values.length / 2)
        .map(type => ({
          type,
          canEdit: true,
        }));

      return {
        ...state,
        inputs: typeArray,
      };
    }
    case UPDATE_LABEL: {
      return {
        ...state,
        inputs: update(
          [...state.inputs],
          {[action.payload.index]: {
              ...state.inputs[action.payload.index],
              label: action.payload.label,
            }}
          ),
      };
    }
    case UPDATE_VALUE: {
      return {
        ...state,
        inputs: update(
          [...state.inputs],
          {[action.payload.index]: {
              ...state.inputs[action.payload.index],
              value: action.payload.value,
            }}
        ),
      };
    }
    case REQUIRE_INPUT: {
      return {
        ...state,
        inputs: update(
          [...state.inputs],
          {[action.payload]: {
              ...state.inputs[action.payload],
              isRequired: true,
            }}
        ),
      };
    }
    case UNREQUIRE_INPUT: {
      return {
        ...state,
        inputs: update(
          [...state.inputs],
          {[action.payload]: {
              ...state.inputs[action.payload],
              isRequired: false,
            }},
        ),
      };
    }
    case ADD_OPTION: {
      const inputIndex = action.payload.inputIndex;

      return {
        ...state,
        inputs: update(
          [...state.inputs],
          {[inputIndex]: {
              ...state.inputs[inputIndex],
              options: [
                ...(state.inputs[inputIndex].options || []),
                action.payload.option,
              ],
            }}
        ),
      };
    }
    case UPDATE_OPTION: {
      const inputIndex = action.payload.inputIndex;

      return {
        ...state,
        inputs: update(
          [...state.inputs],
          {[inputIndex]: {
              ...state.inputs[inputIndex],
              options: update(
                [...state.inputs[inputIndex].options],
                {
                  [action.payload.optionIndex]: action.payload.option
                },
              ),
            }}
        ),
      };
    }
    case DELETE_OPTION: {
      const inputIndex = action.payload.inputIndex;

      return {
        ...state,
        inputs: update(
          [...state.inputs],
          {[inputIndex]: {
              ...state.inputs[inputIndex],
              options: state.inputs[inputIndex].options
                .filter((_, index) => action.payload.optionIndex !== index),
            }}
        ),
      };
    }
    case VALIDATE: {
      return {
        ...state,
        inputs: update(
          [...state.inputs],
          {[action.payload]: {
              ...state.inputs[action.payload],
              errorType: getError(action.payload, state.inputs),
            }}
        ),
      };
    }
    default: {
      return state;
    }
  }
};
