import { useConfirmationMutation } from '@/features/authentication';
import { ConfirmBlock } from '@/features/confirmBlock';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Confirm = () => {
   const [searchParams] = useSearchParams();
   const [confirm, { isSuccess, isLoading }] = useConfirmationMutation();

   const handleConfirm = async (ct: any) => {
      try {
         const res: any = await confirm({ ct });
         if (res.erorr) {
            console.log('error in try - ', res.error);
         } else {
            console.log(res);
         }
      } catch (error) {
         console.log('error', error);
      }
   };

   useEffect(() => {
      const ct = searchParams.get('ct');
      if (ct) {
         handleConfirm(ct);
      }
   }, []);
   return <ConfirmBlock isSuccess={isSuccess} isLoading={isLoading} />;
};

export default Confirm;
