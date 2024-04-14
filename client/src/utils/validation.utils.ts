export const isPhoneValid = (phone: string | null): boolean => {
  if (phone === null) {
    return false; // hoặc có thể throw error
  }
  const phoneRegex = /^\d{10}$/; // 10 chữ số
  return phoneRegex.test(phone);
};

/**
 * validation email
 * @param email
 * @returns
 */
const emailValidation = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

/**
 * validation password has at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character
 * @param password
 * @returns
 */
const passwordValidation = (password: string): boolean => {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

/**
 * validation register form
 */
const validateRegisterForm = (
  form: {
    name: string;
    email: string;
    password: string;
    repassword: string;
  },
  notification?: (message: string) => void,
): boolean => {
  let error: string = '';

  // Validate email
  if (!emailValidation(form.email)) {
    error = 'Email is not valid';
  }

  // If email is valid, validate password
  else if (!passwordValidation(form.password)) {
    error =
      'Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character';
  }

  // If email and password are valid, validate repassword
  else if (form.password !== form.repassword) {
    error = 'Passwords do not match';
  }

  // If there is an error, call the notification function
  if (error && notification) {
    notification(error);
  }

  return !error;
};

// const validateLoginForm = (
//   form: {
//     email: string;
//     password: string;
//   },
//   notification?: (message: string) => void,
// ): boolean => {
//   let error: string = '';

//   // Validate email
//   if (!emailValidation(form.email)) {
//     error = 'Email is not valid';
//   }

//   // If email is valid, validate password
//   else if (!passwordValidation(form.password)) {
//     error =
//       'Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character';
//   }

//   // If there is an error, call the notification function
//   if (error && notification) {
//     notification(error);
//   }

//   return !error;
// }

export { emailValidation, passwordValidation, validateRegisterForm };
