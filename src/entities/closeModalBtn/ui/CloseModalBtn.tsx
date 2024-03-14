import { useAppDispatch } from '@/app/appStore';
import styles from './styles.module.scss';
import closeIcon from '@/shared/assets/imgs/modals/close.svg';
import { FC } from 'react';
import { closeModal } from '@/widgets/modal';

const CloseModalBtn: FC = () => {
   const dispatch = useAppDispatch();
   const handleClose = () => {
      dispatch(closeModal());
   };

   return (
      <div className={styles.btn} onClick={handleClose}>
         <img src={closeIcon} alt='close icons' />
      </div>
   );
};

export default CloseModalBtn;
