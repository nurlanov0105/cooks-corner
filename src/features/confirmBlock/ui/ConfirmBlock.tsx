import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

// useRouter
interface Props {
   isLoading: boolean;
   isSuccess: boolean;
   isError: boolean;
}

const ConfirmBlock: FC<Props> = ({ isSuccess, isLoading, isError }) => {
   const navigate = useNavigate();
   const [countdown, setCountdown] = useState(5);

   useEffect(() => {
      const timer = setInterval(() => {
         setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      if (countdown === 0) {
         clearInterval(timer);
         if (countdown === 0 && isSuccess) {
            navigate('/signin');
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
         ) : isSuccess ? (
            <>
               {!isError ? (
                  <h2 className={styles.confirm__title}>
                     Произошла ошибка при верификации. <br />
                  </h2>
               ) : (
                  <h2 className={styles.confirm__title}>Подтверждение аккаунта прошло успешно!</h2>
               )}

               <div className={styles.confirm__block}>
                  Через <b>{countdown}</b> секунд вас перенест на страницу логина.
               </div>
            </>
         ) : (
            ''
         )}
      </div>
   );
};

export default ConfirmBlock;
