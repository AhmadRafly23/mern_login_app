import { toast } from 'react-hot-toast';
import { authenticate } from './helper';

/*validate login page username*/
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  if (values.username) {
    const { status } = await authenticate(values.username);

    if (status !== 200) {
      errors.exist = toast.error('Username does not exist...!');
    }
  }

  return errors;
}

/*validate login page password*/
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);

  return errors;
}

/*Validate page reset password*/
export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error('Password not match...!');
  }

  console.log(errors);

  return errors;
}

/*Validate page register*/
export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

/*Validate page profile*/
export async function profileValidation(values) {
  const errors = emailVerify({}, values);

  return errors;
}

/*Validate Username*/
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error('Username is required');
  } else if (values.username.includes(' ')) {
    error.username = toast.error('Invalid Username');
  }

  return error;
}

/*Validate Password*/
function passwordVerify(error = {}, values) {
  const specialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  if (!values.password) {
    error.password = toast.error('Password is required');
  } else if (values.password.includes(' ')) {
    error.password = toast.error('Invalid Password');
  } else if (values.password.length < 6) {
    error.password = toast.error('Password must be at least 6 characters');
  } else if (!specialCharacter.test(values.password)) {
    error.password = toast.error(
      'Password must contain at least one special character'
    );
  }

  return error;
}

/*Validate Email*/
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error('Email Required...!');
  } else if (values.email.includes(' ')) {
    error.email = toast.error('Wrong Email...!');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error('Invalid email address...!');
  }

  return error;
}
