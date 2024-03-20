import { useAppDispatch } from '@/app/appStore';
import { getEmailFromLS } from '@/shared/lib/helpers';
import { closeModal } from '@/widgets/modal';
import styles from './styles.module.scss';

const EmailNoticeModal = () => {
   const dispatch = useAppDispatch();
   const { email } = getEmailFromLS();

   const handleClick = () => {
      dispatch(closeModal());
   };

   return (
      <div className={styles.block}>
         <h3 className={styles.block__title}>
            We have sent another letter to the email address you provided.
            <span>{email ? email : null}</span>
         </h3>
         <p className={styles.block__descr}>Don't forget to check your Spam box !</p>
         <button className={'btn'} onClick={handleClick}>
            <span>Okay</span>
         </button>
      </div>
   );
};

export default EmailNoticeModal;
