import { FC } from 'react';
import { useAppDispatch } from '@/app/appStore';
import { showModal } from '@/widgets/modal';
import { VerifyBlock } from '@/features/verifyBlock';
import { getEmailFromLS } from '@/shared/lib/helpers';
import { toast } from 'react-toastify';
import { resendEmail } from '@/features/authentication';
import { IResendEmailRequest } from '@/shared/lib/types';
import { useMutation } from '@tanstack/react-query';
import { BaseURL } from '@/shared/api/endpoints';

const Verification: FC = () => {
   const dispatch = useAppDispatch();

   const { mutate: resendEmailMutate, isPending } = useMutation({
      mutationFn: (params: IResendEmailRequest) => resendEmail(params),
      onSuccess: () => {
         dispatch(showModal('EmailNoticeModal'));
      },
      onError: (error) => {
         toast.error('Email resend error');
         console.log(error);
      },
   });

   const handelResendConfirmation = async () => {
      const { email } = getEmailFromLS();
      const params = { email, url: BaseURL };
      console.log(params);

      resendEmailMutate(params);
   };
   return <VerifyBlock handelResendConfirmation={handelResendConfirmation} isLoading={isPending} />;
};

export default Verification;
