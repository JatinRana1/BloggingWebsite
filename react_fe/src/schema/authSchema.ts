import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
})

export const signUpSchema = Yup.object().shape({
  email: Yup.string()
  .email('Invalid email address')
  .required('Email is required'),
password: Yup.string()
  .min(6, 'Password must be at least 6 characters long')
  .required('Password is required'),
})