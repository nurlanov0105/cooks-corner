import * as yup from 'yup';

const nameSchema = yup.string().min(4, 'Минимум 4 символа').required('Требуется логин');
const emailSchema = yup
   .string()
   .email('Неверный адрес электронной почты')
   .required('Требуется адрес электронной почты');

const passwordSchema = yup
   .string()
   .min(8, 'Минимум 8 символов')
   .matches(/[a-z]/, 'Строчные и прописные буквы')
   .matches(/[A-Z]/, 'Строчные и прописные буквы')
   .matches(/\d/, 'Минимум 1 цифра')
   .matches(/[^a-zA-Z0-9]/, 'Минимум 1 спецсимвол (!, ", #, $...)')
   .required('Требуется пароль');

const passwordConfirmSchema = yup
   .string()
   .oneOf([yup.ref('password'), undefined], 'Пароли должны совпадать')
   .required('Пароли должны совпадать');

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
