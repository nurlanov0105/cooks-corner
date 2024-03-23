import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ConfirmBlock } from '@/features/confirmBlock';
import { useMutation } from '@tanstack/react-query';
import { confirm } from '@/features/authentication';

const Confirm: FC = () => {
   const [searchParams] = useSearchParams();

   const {
      mutate: confirmMutate,
      isPending,
      isSuccess,
      isError,
   } = useMutation({
      mutationFn: confirm,
      onSuccess: (data) => {
         console.log(data);
      },
      onError: (error) => {
         console.log(error);
      },
   });

   const handleConfirm = (ct: any) => {
      confirmMutate(ct);
   };

   useEffect(() => {
      const ct = searchParams.get('ct');
      if (ct) {
         handleConfirm(ct);
      }
   }, []);
   return <ConfirmBlock isSuccess={isSuccess} isLoading={isPending} isError={isError} />;
};

export default Confirm;
