import { VerifyBlock } from '@/features/verifyBlock';
import { useAppDispatch } from '@/app/appStore';
import { showModal } from '@/widgets/modal';
import { useResendConfirmationMutation } from '@/features/authentication';
import { toast } from 'react-toastify';
import { getEmailFromLS } from '@/shared/lib/helpers';

const Verification = () => {
   const dispatch = useAppDispatch();

   const [resendConfirmation, { isLoading }] = useResendConfirmationMutation();

   const handelResendConfirmation = async () => {
      const { email } = getEmailFromLS();

      const response: any = await resendConfirmation({ email });

      if (response.error) {
         console.log('error in try', response.error);
         toast.error('erorr resend confirmation');
      } else {
         dispatch(showModal('EmailNoticeModal'));
      }
   };
   return <VerifyBlock handelResendConfirmation={handelResendConfirmation} isLoading={isLoading} />;
};

export default Verification;
