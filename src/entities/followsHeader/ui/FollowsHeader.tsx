import { FC } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch } from '@/app/appStore';
import { closeMobileModal } from '@/widgets/mobileModal';

interface Props {
   name: string;
}

const FollowsHeader: FC<Props> = ({ name }) => {
   const dispatch = useAppDispatch();
   const handleClose = () => {
      dispatch(closeMobileModal());
   };
   return (
      <div className={styles.top}>
         <h2 className='h2'>{name}</h2>
         <button className={styles.top__btn} onClick={handleClose}>
            <svg>
               <polyline
                  fill='none'
                  points='20.643 3.357 12 12 3.353 20.647'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='3'></polyline>
               <line
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='3'
                  x1='20.649'
                  x2='3.354'
                  y1='20.649'
                  y2='3.354'></line>
            </svg>
         </button>
      </div>
   );
};

export default FollowsHeader;
