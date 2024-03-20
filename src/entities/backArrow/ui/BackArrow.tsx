import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import arrowBack from '@/shared/assets/imgs/main/arrow-back.svg';

const BackArrow: FC = () => {
   const navigate = useNavigate();
   const handleGoBack = () => {
      navigate(-1);
   };
   return (
      <div className={styles.btn} onClick={handleGoBack}>
         <img src={arrowBack} alt='arrow back' />
      </div>
   );
};

export default BackArrow;
