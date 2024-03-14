import classNames from 'classnames';
import styles from './styles.module.scss';
import { useAppDispatch } from '@/app/appStore';
import { closeModal } from '@/widgets/modal';

const LogoutModal = () => {
   const dispatch = useAppDispatch();
   const handleLogout = () => {
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
               <span>Yes</span>
            </button>
            <button className={classNames('btn', styles.modal__btn)} onClick={onClickNo}>
               <span>No</span>
            </button>
         </div>
      </div>
   );
};

export default LogoutModal;
