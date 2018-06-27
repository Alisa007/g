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
} from '../actions/form.actions';
import {ErrorTypeEnum } from '../enums/ErrorType.enum';
const update = Object.assign;
const getError = (index, inputs): ErrorTypeEnum => {
  const input = inputs[index];

  if (input.isRequired && !input.value) {
    return ErrorTypeEnum.Required;
  }

  if (inputs.find(v => (v.type !== input.type) && (v.label === input.label))) {
    return  ErrorTypeEnum.Unique;
  }

  if (input.options.filter(v => v).length) {
    return  ErrorTypeEnum.HasOptions;
  }

  if (input.options.find(v => (v.type !== input.type) && (v === input.label))) {
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
              errorType: getError(action.payload.index, state.inputs),
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
              errorType: getError(action.payload.index, state.inputs),
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
              errorType: getError(action.payload, state.inputs),
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
              errorType: getError(action.payload, state.inputs),
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
              errorType: getError(inputIndex, state.inputs),
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
              errorType: getError(inputIndex, state.inputs),
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
              errorType: getError(inputIndex, state.inputs),
            }}
        ),
      };
    }

    default: {
      return state;
    }
  }
};
