export interface FormAction {
  type: string,
  data: ActionData,
}

type ActionData = {
  name: string,
  value: string,
  touched?: boolean,
  hasError?: boolean,
  error?: string,
  isFormValid?: boolean,
}

export const validateInput = (name: string, value: string) => {
  let hasError = false;
  let error = '';

  switch (name) {
    case 'name':
      if (!value) {
        hasError = true;
        error = 'This field is required';
      } else if (!value.match(/^[A-Z]{1}[a-z]{1,12}$/g)) {
        hasError = true;
        error = 'Invalid format (letters only, 2-13 chars, capitalized)'
      } else {
        hasError = false;
        error = '';
      }
      break;

    case 'number':
      if (!value) {
        hasError = true;
        error = 'This field is required';
      } else if (!value.match(/^\d{12}$/g)) {
        hasError = true;
        error = 'Invalid format (digits only, must contain 12 chars)'
      } else {
        hasError = false;
        error = '';
      }
      break;

    default:
      break;
  }

  return { hasError, error }
}

export const handleChange = (
  name: string,
  value: string,
  dispatch: React.Dispatch<FormAction>,
  formState: Record<string, any>,
) => {
  const { hasError, error } = validateInput(name, value);
  let isFormValid = true;

  for (const key in formState) {
    const formField = formState[key];

    if (key === name && hasError) {
      isFormValid = false;
      break;
    } else if (key !== name && formField.hasError) {
      isFormValid = false;
    }
  }

  dispatch({
    type: 'update',
    data: {
      name,
      value,
      touched: false,
      hasError,
      error,
      isFormValid,
    }
  })
}

export const handleFocusLoss = (
  name: string,
  value: string,
  dispatch: React.Dispatch<FormAction>,
  formState: Record<string, any>,
) => {
  const { hasError, error } = validateInput(name, value);
  let isFormValid = true;

  for (const key in formState) {
    const formField = formState[key];

    if (key === name && hasError) {
      isFormValid = false;
      break;
    } else if (key !== name && formField.hasError) {
      isFormValid = false;
    }
  }

  dispatch({
    type: 'update',
    data: {
      name,
      value,
      touched: true,
      hasError,
      error,
      isFormValid,
    }
  })
};
