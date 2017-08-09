export function validateInput(value) {
  if (value.length > 2) return '';
  else if (value.length > 0) return 'Verður að vera 3 stafir eða meira';
}

export function validateDescription(value) {
  if (value.length > 10) return '';
  else if (value.length > 0) return 'Verður að vera 10 stafir eða meira';
}

export function validateDateInput(value) {
  if (value.substring(0,10) < new Date().toISOString().substring(0,10))
    return 'Ógild dagsetning'
}

export function getDateValidationState(value) {
  if (value.substring(0,10) < new Date().toISOString().substring(0,10))
    return 'error';
  else return null;
}

export function getValidationState(value) {
  if (value.length > 2) return null;
  else if (value.length > 0) return 'error';
}

export function getDescValidationState(value) {
  if (value.length > 10) return null;
  else if (value.length > 0) return 'error';
}

export function returnFormErrors(data) {
  const errors = {};
    if (data.name.length < 3 || data.location.length < 3 || data.description.length < 10 || validateDateInput(data.time) != null) {
      errors.value = 'Error in form!'
    } else {
      errors.value = null;
    }
  return errors;
}
