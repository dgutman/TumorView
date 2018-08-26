export default class ValidationHelper {
  constructor() {
  }

  validatePassword(password) {
    if (password.length > 0) {
      return true
    } else {
      return false
    }
  }

  validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/.test(email))
    {
      return true
    } else {
      return false
    }
  }
}
