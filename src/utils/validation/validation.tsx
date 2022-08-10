const REQUIRED_FIELD = "Field can't be empty"

export const nameValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match(/^[A-Z, А-Я]/)) {
      return 'Capitalize your name'
    }
    if (value.match(/[^\-,A-Z,a-z,А-Я,а-я]/)) {
      return "Don't use special characters, numbers and spaces"
    }
    return true
  },
}
export const emailValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match(/^[\w+-]+(\.[\w+-]+)*@[\w-]+(\.[\w-]+)+$/)) {
      return 'Wrong email format'
    }
    return true
  },
}
export const loginValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match('^(?=.*[A-Za-z])[A-Za-z0-9_\\-]{3,20}$')) {
      return 'Only letters, numbers and _'
    }
    return true
  },
}
export const phoneValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{10,15}$')) {
      return 'Invalid phone'
    }
    return true
  },
}
export const passwordValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match('^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,40}$')) {
      return 'Min 8 characters. Required to have a capital letter and a number'
    }
    return true
  },
}
