import { FC, useState } from 'react';
import styles from './styles.module.scss';
import { useFormik } from 'formik';
import { loginValidationSchema } from '../model/validation';
import { getInputClassNames } from '../model/getInputClassNames';
import ErrorMessage from './ErrorMessage';
import { Link } from 'react-router-dom';

import dogIcon from '@/shared/assets/imgs/auth/dog.svg';
import eyeClosedIcon from '@/shared/assets/imgs/auth/eye-closed.svg';
import eyeOpenedIcon from '@/shared/assets/imgs/auth/eye-opened.svg';

interface Props {
   handleLogin: (email: string, password: string) => void;
   isLoading: boolean;
}

const SignInForm: FC<Props> = ({ handleLogin, isLoading }) => {
   const [showPassword, setShowPassword] = useState(false);

   const handlePasswordShow = () => setShowPassword(!showPassword);

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },

      validationSchema: loginValidationSchema,
      onSubmit: (values, { setSubmitting }) => {
         setSubmitting(false);
         const { email, password } = values;
         handleLogin(email, password);
      },
      validateOnMount: true,
   });

   const emailClassNames = getInputClassNames(formik, 'email');
   const pswClassNames = getInputClassNames(formik, 'password');

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
               <label className={styles.form__label}>
                  <span className={styles.form__title}>Password</span>
                  <div className={styles.form__outbox}>
                     <div className={styles.form__box}>
                        <input
                           type={showPassword ? 'text' : 'password'}
                           className={pswClassNames}
                           placeholder='Enter your Password'
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
            </div>
            <button
               className='btn'
               type='submit'
               disabled={!!Object.keys(formik.errors).length || isLoading}>
               {isLoading ? <span>Loading...</span> : <span>Sign In</span>}
            </button>
         </form>
         <div className={styles.wrapper__bottom}>
            <div>
               <p>
                  I don’t have an account?{' '}
                  <Link to='/signup' className='accent-color'>
                     Sign Up Now
                  </Link>
               </p>
               or
               <p>
                  Forgot password?{' '}
                  <Link to='/forgot-password' className='accent-color'>
                     Forgot password
                  </Link>
               </p>
            </div>
            <Link to='/' className='accent-color'>
               Go to Home page
            </Link>
         </div>
      </div>
   );
};

export default SignInForm;
