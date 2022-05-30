import React, { useReducer } from "react";
import { Product } from "../../types";
import { CardTemplate } from "../CardTemplate/CardTemplate";
import {
  handleChange,
  handleFocusLoss,
  validateInput,
  FormAction,
} from "../../lib/formFunctions";
import classNames from "classnames";

import './Modal.scss'

type Props = {
  product: Product,
  closeModal: () => void,
};

const initialState = {
  name: {
    value: '',
    touched: false,
    hasError: true,
    error: '',
  },
  number: {
    value: '',
    touched: false,
    hasError: true,
    error: '',
  },
  isFormValid: true,
}

const formReducer = (
  state: Record<string, any>,
  action: FormAction,
) => {
  const { type } = action;
  switch (type) {
    case 'update':
      const {
        name,
        value,
        touched,
        hasError,
        error,
        isFormValid,
      } = action.data;
      return {
        ...state,
        [name]: {
          ...state[name],
          value,
          touched,
          hasError,
          error,
        },
        isFormValid,
      }

    case 'clear': {
      const {
        name,
        value,
      } = action.data;

      return {
        ...state,
        [name]: {
          ...state[name],
          value,
          touched,
          hasError,
          error,
          isFormValid,
        }
      }
    }

    case 'reset': {
      return initialState;
    }
  
    default:
      return state;
  }
}

export const Modal: React.FC<Props> = ({ product, closeModal }) => {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const clearField = (event: React.MouseEvent<HTMLButtonElement>) => {
    for (const name in formState) {
      if (name === event.currentTarget.id) {
        dispatch({
          type: 'update',
          data: {
            name,
            value: '',
            hasError: true,
            error: '',
            touched: false,
          },
        })
      }
    }
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let isFormValid = true;

    for (const name in formState) {
      const field = formState[name];
      const { value } = field;
      const { hasError, error } = validateInput(name, value);

      if (hasError) {
        isFormValid = false;
      }

      if (name) {
        dispatch({
          type: 'update',
          data: {
            name,
            value,
            hasError,
            error,
            touched: true,
            isFormValid,
          },
        })
      }
    }

    if (!isFormValid) {
      return;
    } else {
      console.log(`${formState.name.value}, ${formState.number.value}`);
      dispatch({
        type: 'reset',
        data: {
          name: '',
          value: '',
          hasError: true,
          error: '',
          touched: false,
          isFormValid: true,
        }
      });
      closeModal();
    }
  }

  return (
    <div className='modal'>
      <button
        className='modal__close'
        onClick={closeModal}
      >
        &#215;
      </button>

      <CardTemplate product={product} />

      <form
        className='order'
      >
        <div
          className={classNames('order__field', {
            'order__field--error': formState.name.hasError && formState.name.touched,
            'order__field--ok': !formState.name.hasError && formState.name.touched,
          })}
        >
          <input
            className='order__field_input'
            type='text'
            name='name'
            value={formState.name.value}
            placeholder="Name"
            autoComplete="off"
            onChange={(event) => {
              handleChange(
                event.target.name,
                event.target.value,
                dispatch,
                formState
              );
            }}
            onBlur={(event) => {
              handleFocusLoss(
                event.target.name,
                event.target.value,
                dispatch,
                formState
              );
            }}
          />
          <button
            id='name'
            className={classNames('order__field_clear', {
              'onError': formState.name.error.includes('format') && formState.name.touched,
            })}
            type='button'
            onClick={(event) => {
              clearField(event)
            }}
          >
            &#215;
          </button>
        </div>

        <p
          className='order__error'
          style={{
            opacity: !formState.name.hasError ? '0' : '1',
            visibility: !formState.name.hasError ? 'hidden' : 'visible',
          }}
        >
            {formState.name.hasError && formState.name.touched && formState.name.error}
        </p>

        <div
          className={classNames('order__field', {
            'order__field--error': formState.number.hasError && formState.number.touched,
            'order__field--ok': !formState.number.hasError && formState.number.touched,
          })}
        >
          <input
            className='order__field_input'
            type='text'
            name='number'
            value={formState.number.value}
            placeholder="Number"
            autoComplete="off"
            onChange={(event) => {
              handleChange(
                event.target.name,
                event.target.value,
                dispatch,
                formState
              );
            }}
            onBlur={(event) => {
              handleFocusLoss(
                event.target.name,
                event.target.value,
                dispatch,
                formState
              );
            }}
          />
          <button
            id='number'
            className={classNames('order__field_clear', {
              'onError': formState.number.error.includes('format') && formState.number.touched,
            })}
            type='button'
            onClick={(event) => {
              clearField(event)
            }}
          >
            &#215;
          </button>
        </div>

        <p
          className='order__error'
          style={{
            opacity: !formState.number.hasError ? '0' : '1',
            visibility: !formState.number.hasError ? 'hidden' : 'visible',
          }}
        >
            {formState.number.hasError && formState.number.touched && formState.number.error}
        </p>

        <button
          className={classNames('order__button', {
            'disabled': !formState.isFormValid,
          })}
          type='submit'
          disabled={!formState.isFormValid}
          onClick={handleSubmit}
        >
          ORDER
        </button>
      </form>
    </div>
  )
};
