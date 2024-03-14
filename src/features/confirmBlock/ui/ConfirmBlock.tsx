import { FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

// useRouter
interface Props {
   isLoading: boolean;
   isSuccess: boolean;
   error: any;
}

const ConfirmBlock: FC<Props> = ({ isSuccess, isLoading, error }) => {
   const navigate = useNavigate();
   const [countdown, setCountdown] = useState(10);

   useEffect(() => {
      const timer = setInterval(() => {
         setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      if (countdown === 0) {
         clearInterval(timer);
         if (countdown === 0 && isSuccess) {
            navigate('/');
         }
      }

      return () => {
         clearInterval(timer);
      };
   }, [countdown]);

   return (
      <div className={styles.confirm}>
         {isLoading ? (
            <h2 className={styles.confirm__title}>Загрузка...</h2>
         ) : error ? (
            <h2 className={styles.confirm__title}>
               Произошла ошибка при верификации. <br /> {error.data.Error}
            </h2>
         ) : (
            <>
               <h2 className={styles.confirm__title}>Подтверждение аккаунта прошло успешно!</h2>
               <div className={styles.confirm__block}>
                  Через <b>{countdown}</b> секунд вас перенест на страницу логина.
               </div>
            </>
         )}
      </div>
   );
};

export default ConfirmBlock;
