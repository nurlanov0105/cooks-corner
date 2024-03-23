import { FC } from 'react';
import { useAppDispatch } from '@/app/appStore';
import { showModal } from '@/widgets/modal';
import { VerifyBlock } from '@/features/verifyBlock';
import { getEmailFromLS } from '@/shared/lib/helpers';
import { resendEmail } from '@/features/authentication';
import { useMutation } from '@tanstack/react-query';
import { BaseURL } from '@/shared/api/endpoints';

const Verification: FC = () => {
   const dispatch = useAppDispatch();

   const resendEmailMutate = useMutation({
      mutationFn: resendEmail,
      onSuccess: () => {
         dispatch(showModal('EmailNoticeModal'));
      },
   });

   const handelResendConfirmation = async () => {
      const { email } = getEmailFromLS();
      const params = { email, url: BaseURL };

      resendEmailMutate.mutate(params);
   };
   return (
      <VerifyBlock
         handelResendConfirmation={handelResendConfirmation}
         isLoading={resendEmailMutate.isPending}
         isError={resendEmailMutate.isError}
      />
   );
};

export default Verification;
