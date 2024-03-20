import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { singleEmailValidationSchema } from '../model/validation';
import ErrorMessage from './ErrorMessage';
import { getInputClassNames } from '../model/getInputClassNames';

import styles from './styles.module.scss';
import dogIcon from '@/shared/assets/imgs/auth/dog.svg';

interface Props {
   handleForgotPassword: (password: string) => void;
   isLoading: boolean;
}

const ForgetPasswordForm: FC<Props> = ({ handleForgotPassword, isLoading }) => {
   const navigate = useNavigate();

   const formik = useFormik({
      initialValues: {
         email: '',
      },

      validationSchema: singleEmailValidationSchema,
      onSubmit: (values, { setSubmitting }) => {
         setSubmitting(false);
         const { email } = values;
         handleForgotPassword(email);
      },
      validateOnMount: true,
   });

   const emailClassNames = getInputClassNames(formik, 'email');

   const goBack = () => {
      navigate(-1);
   };

   return (
      <div className={styles.wrapper}>
         <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.form__col}>
               <label className={styles.form__label}>
                  <span className={styles.form__title}>Gmail</span>
                  <div className={styles.form__outbox}>
                     <div className={styles.form__box}>
                        <input
                           type='email'
                           className={emailClassNames}
                           placeholder='Enter your Gmail'
                           name='email'
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.email}
                        />
                        <img src={dogIcon} alt='dog icon' className={styles.form__icon} />
                     </div>
                     <ErrorMessage formik={formik} name='email' />
                  </div>
               </label>
            </div>
            <button
               className='btn'
               type='submit'
               disabled={!!Object.keys(formik.errors).length || isLoading}>
               {isLoading ? <span>Loading...</span> : <span>Submit</span>}
            </button>
         </form>
         <div className={styles.wrapper__bottom}>
            <span className={styles.wrapper__span} onClick={goBack}>
               Go back
            </span>
         </div>
      </div>
   );
};

export default ForgetPasswordForm;
