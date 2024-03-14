import { ConfirmBlock } from '@/features/confirmBlock';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Confirm = () => {
   const [searchParams] = useSearchParams();
   useEffect(() => {
      const token = searchParams.get('token');
      if (token) {
         console.log(token);
      }
   }, []);
   return <ConfirmBlock isSuccess={true} isLoading={false} error='' />;
};

export default Confirm;
