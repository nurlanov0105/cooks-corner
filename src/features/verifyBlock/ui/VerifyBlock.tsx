import { FC } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

type Props = {
   handelResendConfirmation: () => void;
   isLoading: boolean;
};

const VerifyBlock: FC<Props> = ({ handelResendConfirmation, isLoading }) => {
   const handleClick = () => {
      handelResendConfirmation();
   };

   return (
      <div className={styles.block}>
         <div className={styles.block__descr}>
            <p>
               If the letter has not arrived, do not rush to wait for the owl mail - it is better to{' '}
               <br />
               <b>check your Spam box</b>
            </p>
         </div>

         <button
            className={classNames('btn', styles.block__btn)}
            onClick={handleClick}
            disabled={isLoading}>
            {isLoading ? <span>Loading...</span> : <span>Don`t get the letter</span>}
         </button>
      </div>
   );
};

export default VerifyBlock;
