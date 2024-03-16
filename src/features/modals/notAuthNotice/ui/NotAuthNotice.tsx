import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { useAppDispatch } from '@/app/appStore';
import { closeModal } from '@/widgets/modal';
import { closeModalBlur } from '@/widgets/modalBlur';

const NotAuthNotice = () => {
   const dispatch = useAppDispatch();
   const handleCloseModal = () => {
      dispatch(closeModalBlur());
      dispatch(closeModal());
   };
   return (
      <div className={styles.wrapper}>
         <h2 className='h2'>You need to be authorized</h2>
         <div className={styles.wrapper__block}>
            <p>
               <Link to='/signin' onClick={handleCloseModal}>
                  Sign in
               </Link>{' '}
               if you have an account
            </p>
            <p>Or</p>
            <p>
               Don`t have an account?{' '}
               <Link to='/signup' onClick={handleCloseModal}>
                  Sign up
               </Link>
            </p>
         </div>
      </div>
   );
};

export default NotAuthNotice;
