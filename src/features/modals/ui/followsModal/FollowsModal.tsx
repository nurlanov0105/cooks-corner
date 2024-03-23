import { FollowsHeader } from '@/entities/followsHeader';
import styles from './styles.module.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/app/appStore';
import { closeMobileModal } from '@/widgets/mobileModal';

interface Props {
   name: string;
   data: any;
   isLoading: boolean;
}

const FollowsModal: FC<Props> = ({ name, data, isLoading }) => {
   const dispatch = useAppDispatch();
   const handleClose = () => {
      dispatch(closeMobileModal());
   };

   return (
      <div className={styles.modal}>
         <FollowsHeader name={name} />
         <div className={styles.modal__content}>
            {isLoading ? (
               <h1>Loading...</h1>
            ) : data.length === 0 ? (
               <h2 className='h2'>There are no {name}</h2>
            ) : (
               data.map((item: any) => (
                  <Link
                     key={item.userId}
                     to={`/authors/${item.userId}`}
                     className={styles.modal__row}
                     onClick={handleClose}>
                     <div
                        className={styles.modal__img}
                        style={{ backgroundImage: `url(${item.imageUrl})` }}></div>
                     <h4 className={styles.modal__title}>{item.name}</h4>
                  </Link>
               ))
            )}
         </div>
      </div>
   );
};

export default FollowsModal;
