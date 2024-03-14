import { FC } from 'react';
import { FormikProps } from 'formik';
import styles from './styles.module.scss';

type Props = {
   formik: FormikProps<any>;
   name: string;
};

const ErrorMessage: FC<Props> = ({ formik, name }) => {
   return formik.values[name] && formik.touched[name] && formik.errors[name] ? (
      <div className={styles.error}>{String(formik.errors[name])}</div>
   ) : null;
};
export default ErrorMessage;
