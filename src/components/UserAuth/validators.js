export function validateInput(value) {
 if (value.length > 4)
   return ""
   else if (value.length > 0)
   return "Verður að vera 5 stafir eða meira"
}

export function validatePassword(newValue, value) {
 if (value != newValue && newValue != '')
   return "Lykilorð passa ekki saman"
}

export function validateEmail(value) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (value.length > 0 && !re.test(value)) return 'Netfang ógilt';
}

export function getEmailValidationState(value) {
  if (validateEmail(value) == 'Netfang ógilt') return 'error';
}

export function getValidationState(value) {
if (value.length > 4) return '';
  else if (value.length > 0) return 'error';
}

export function getPasswordValidationState(newValue, value) {
 if (value != newValue && newValue != '')
   return "error"
}
