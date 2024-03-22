import * as yup from 'yup';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const nameSchema = yup
   .string()
   .min(4, 'Minimum 4 characters')
   .required('Login required')
   .test('is-not-email', 'Name should not be an email address', (value) => {
      return !emailRegex.test(value);
   });
const emailSchema = yup
   .string()
   .required('Email address required')
   .test('is-valid-email', 'Invalid email address', (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
   });
const passwordSchema = yup
   .string()
   .min(8, 'Minimum 8 characters')
   .matches(/[a-z]/, 'Lowercase and uppercase letters')
   .matches(/[A-Z]/, 'Lowercase and uppercase letters')
   .matches(/\d/, 'At least 1 digit')
   .matches(/[^a-zA-Z0-9]/, 'At least 1 special character (!, ", #, $...)')
   .required('Password required');

const passwordConfirmSchema = yup
   .string()
   .oneOf([yup.ref('password'), undefined], 'Passwords must match')
   .required('Passwords must match');

// login
export const loginValidationSchema = yup.object({
   email: emailSchema,
   password: passwordSchema,
});

// register
export const registerValidationSchema = yup.object({
   name: nameSchema,
   email: emailSchema,
   password: passwordSchema,
   passwordConfirm: passwordConfirmSchema,
});

// password
export const pswValidationSchema = yup.object({
   password: passwordSchema,
   passwordConfirm: passwordConfirmSchema,
});

export const singleEmailValidationSchema = yup.object({
   email: emailSchema,
});
export const singlePasswordValidationSchema = yup.object({
   password: passwordSchema,
});

// new password
// export const newPswValidationSchema = yup.object({
//    newPassword: passwordSchema,
//    newPasswordConfirm: yup
//       .string()
//       .oneOf([yup.ref('newPassword'), undefined], 'Пароли должны совпадать')
//       .required('Пароли должны совпадать'),
// });

// export const allPasswordSchema = yup.object({
//    oldPassword: passwordSchema,
//    password: passwordSchema.notOneOf(
//       [yup.ref('oldPassword')],
//       'Новый пароль не должен совпадать со старым'
//    ),
//    passwordConfirm: yup
//       .string()
//       .oneOf([yup.ref('password'), undefined], 'Пароли должны совпадать')
//       .required('Пароли должны совпадать'),
// });
