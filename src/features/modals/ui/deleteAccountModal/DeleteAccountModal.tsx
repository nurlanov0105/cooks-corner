import { CloseModalBtn } from '@/entities/closeModalBtn';
import styles from './styles.module.scss';
import { useFormik } from 'formik';
import {
   ErrorMessage,
   deleteAccount,
   getInputClassNames,
   removeAccessToken,
   removeUserInfo,
   singlePasswordValidationSchema,
} from '@/features/authentication';

import eyeClosedIcon from '@/shared/assets/imgs/auth/eye-closed.svg';
import eyeOpenedIcon from '@/shared/assets/imgs/auth/eye-opened.svg';
import { FC, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '@/app/appStore';
import { toast } from 'react-toastify';
import { closeModal } from '@/widgets/modal';
import { useNavigate } from 'react-router-dom';

const DeleteAccountModal: FC = () => {
   const dispatch = useAppDispatch();
   // const queryClient = useQueryClient();
   const navigate = useNavigate();

   const [showPassword, setShowPassword] = useState(false);
   const handlePasswordShow = () => setShowPassword(!showPassword);

   const deleteMutation = useMutation({
      mutationFn: deleteAccount,
      onSuccess: () => {
         localStorage.removeItem('currentEmail');
         dispatch(removeAccessToken());
         dispatch(removeUserInfo());
         dispatch(closeModal());
         toast.success('Succesfully logout');
         navigate('/');
         location.reload();
      },
      onError: (error) => {
         toast.error('Logout error');
         console.log(error);
      },
   });

   const formik = useFormik({
      initialValues: {
         password: '',
      },

      validationSchema: singlePasswordValidationSchema,
      onSubmit: (values, { setSubmitting }) => {
         setSubmitting(false);
         const { password } = values;
         console.log(password);
         deleteMutation.mutate(password);
      },
      validateOnMount: true,
   });

   const pswClassNames = getInputClassNames(formik, 'password');

   return (
      <div className={styles.modal}>
         <CloseModalBtn />
         <h2 className='h2'>Write password to delete account</h2>

         <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.form__col}>
               <label className={styles.form__label}>
                  <span className={styles.form__title}>Password</span>
                  <div className={styles.form__outbox}>
                     <div className={styles.form__box}>
                        <input
                           type={showPassword ? 'text' : 'password'}
                           className={pswClassNames}
                           placeholder='Enter your  Password'
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
               disabled={!!Object.keys(formik.errors).length || deleteMutation.isPending}>
               {deleteMutation.isPending ? <span>Loading...</span> : <span>Delete account</span>}
            </button>
         </form>
      </div>
   );
};

export default DeleteAccountModal;
