import { FormikProps } from 'formik';
import styles from '../ui/styles.module.scss';

export const getInputClassNames = (formik: FormikProps<any>, fieldName: string) => {
   return `${styles.form__input} ${
      formik.values[fieldName] && formik.touched[fieldName] && formik.errors[fieldName]
         ? styles.form__input_error
         : ''
   }`;
};
