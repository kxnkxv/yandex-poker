const REQUIRED_FIELD = "Field can't be empty"

export const nameValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match(/^[A-Z, А-Я]/)) {
      return "Capitalize your name"
    }
    if (value.match(/[^\-,A-Z,a-z,А-Я,а-я]/)) {
      return "Don\'t use special characters, numbers and spaces"
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
    if (value.match(/[^\-\w]/)) {
      return "Don't use Cyrillic, special characters or spaces"
    }
    if (!value.match(/[\D]/)) {
      return "Don't use just numbers"
    }
    if (!(value.length >= 3 && value.length <= 20)) {
      return "Use 3 to 20 characters"
    }
    return true
  },
}
export const phoneValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!(value.length >= 10 && value.length <= 15)) {
      return "Use 10 to 15 symbols"
    }
    if (!value.match(/^[+]?\d+$/)) {
      return "Don\'t use invalid characters"
    }
    return true
  },
}
export const passwordValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value.length < 6) {
      return 'Use 6 to 40 characters'
    }
    if (!value.match(/[A-Z,А-Я]/)) {
      return "Use one capital letter"
    }
    return true
  },
}
