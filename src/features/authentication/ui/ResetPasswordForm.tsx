import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { pswValidationSchema } from '../model/validation';
import { getInputClassNames } from '../model/getInputClassNames';
import ErrorMessage from './ErrorMessage';

import styles from './styles.module.scss';
import eyeClosedIcon from '@/shared/assets/imgs/auth/eye-closed.svg';
import eyeOpenedIcon from '@/shared/assets/imgs/auth/eye-opened.svg';

interface Props {
   handleResetPassword: (password: string) => void;
   isLoading: boolean;
}

const ResetPasswordForm: FC<Props> = ({ handleResetPassword, isLoading }) => {
   // const navigate = useNavigate();

   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const handlePasswordShow = () => setShowPassword(!showPassword);
   const handleConfirmPasswordShow = () => setShowConfirmPassword(!showConfirmPassword);

   const formik = useFormik({
      initialValues: {
         password: '',
         passwordConfirm: '',
      },

      validationSchema: pswValidationSchema,
      onSubmit: (values, { setSubmitting }) => {
         setSubmitting(false);
         const { password } = values;
         handleResetPassword(password);
      },
      validateOnMount: true,
   });

   const pswClassNames = getInputClassNames(formik, 'password');
   const passwordConfirmClassNames = getInputClassNames(formik, 'passwordConfirm');

   // const goBack = () => {
   //    navigate(-1);
   // };

   return (
      <div className={styles.wrapper}>
         <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.form__col}>
               <label className={styles.form__label}>
                  <span className={styles.form__title}>New password</span>
                  <div className={styles.form__outbox}>
                     <div className={styles.form__box}>
                        <input
                           type={showPassword ? 'text' : 'password'}
                           className={pswClassNames}
                           placeholder='Enter your new Password'
                           name='password'
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.password}
                        />
                        <img
                           src={showPassword ? eyeClosedIcon : eyeOpenedIcon}
                           alt='eye opened'
                           className={styles.form__icon}
                           onClick={handlePasswordShow}
                        />
                     </div>
                     <ErrorMessage formik={formik} name='password' />
                  </div>
               </label>
               <label className={styles.form__label}>
                  <span className={styles.form__title}>Re-Password</span>
                  <div className={styles.form__outbox}>
                     <div className={styles.form__box}>
                        <input
                           type={showConfirmPassword ? 'text' : 'password'}
                           className={passwordConfirmClassNames}
                           placeholder='Re-Enter your Password'
                           name='passwordConfirm'
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.passwordConfirm}
                        />
                        <img
                           src={showConfirmPassword ? eyeClosedIcon : eyeOpenedIcon}
                           alt='eye icon'
                           className={styles.form__icon}
                           onClick={handleConfirmPasswordShow}
                        />
                     </div>
                     <ErrorMessage formik={formik} name='passwordConfirm' />
                  </div>
               </label>
            </div>
            <button
               className='btn'
               type='submit'
               disabled={!!Object.keys(formik.errors).length || isLoading}>
               {isLoading ? <span>Loading...</span> : <span>Reset password</span>}
            </button>
         </form>
         <div className={styles.wrapper__bottom}>
            <Link to='/signin' className={styles.wrapper__span}>
               Go to Signin
            </Link>
         </div>
      </div>
   );
};

export default ResetPasswordForm;
