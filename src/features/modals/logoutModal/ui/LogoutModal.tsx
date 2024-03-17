import { useAppDispatch } from '@/app/appStore';
import { getTokensFromLS } from '@/shared/lib/helpers';
import { closeModal } from '@/widgets/modal';
import { removeAccessToken, removeUserId, useLogoutMutation } from '@/features/authentication';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import styles from './styles.module.scss';

const LogoutModal = () => {
   const dispatch = useAppDispatch();
   const { refreshToken } = getTokensFromLS();

   const [logout, { isLoading }] = useLogoutMutation();

   const handleLogout = async () => {
      const respone: any = await logout({ refreshToken });

      if (respone.error) {
         console.log('error in try', respone.error);
      } else {
         localStorage.removeItem('currentUserId');
         localStorage.removeItem('currentTokens');

         dispatch(removeAccessToken());
         dispatch(removeUserId());

         toast.success('Succefsully logout!');
      }
      dispatch(closeModal());
   };

   const onClickNo = () => {
      dispatch(closeModal());
   };

   return (
      <div className={styles.modal}>
         <h2 className='h2'>Are you sure you wanna leave?</h2>
         <div className={styles.modal__btns}>
            <button
               className={classNames('btn', styles.modal__btn, styles.modal__btn_pink)}
               onClick={handleLogout}>
               {isLoading ? <span>Loading...</span> : <span>Yes</span>}
            </button>
            <button className={classNames('btn', styles.modal__btn)} onClick={onClickNo}>
               <span>No</span>
            </button>
         </div>
      </div>
   );
};

export default LogoutModal;
