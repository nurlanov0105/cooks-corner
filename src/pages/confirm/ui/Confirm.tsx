import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ConfirmBlock } from '@/features/confirmBlock';
import { useMutation } from '@tanstack/react-query';
import { confirm } from '@/features/authentication';
import { toast } from 'react-toastify';

const Confirm: FC = () => {
   const [searchParams] = useSearchParams();

   const {
      mutate: confirmMutate,
      isPending,
      isSuccess,
   } = useMutation({
      mutationFn: (ct: string) => confirm(ct),
      onSuccess: (data) => {
         console.log(data);
      },
      onError: (error) => {
         toast.error('confirm error');
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
   return <ConfirmBlock isSuccess={isSuccess} isLoading={isPending} />;
};

export default Confirm;
