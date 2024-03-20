import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { SignUpForm, emailAvailable, register } from '@/features/authentication';
import { useMutation } from '@tanstack/react-query';
import { IRegisterRequest } from '@/shared/lib/types';
import { BaseURL } from '@/shared/api/endpoints';
import { addEmailToLS } from '@/shared/lib/helpers';

const SignUp: FC = () => {
   const navigate = useNavigate();
   const [isEmailAvailable, setIsEmailAvailable] = useState(null);

   const { mutate: registerMutate, isPending } = useMutation({
      mutationFn: (params: IRegisterRequest) => register(params),
      onSuccess: (data) => {
         const newEmail = JSON.stringify({ email: data.email });
         localStorage.setItem('currentEmail', newEmail);
         navigate('/verification');
      },
      onError: (error) => {
         toast.error('Register error');
         console.log(error);
      },
   });

   const { mutate: emailAvailableMutate, isPending: emailLoading } = useMutation({
      mutationFn: (email: string) => emailAvailable(email),
      onSuccess: (data) => {
         setIsEmailAvailable(data?.data);
      },

      onError: (error) => {
         toast.error('email available error');
         console.log(error);
      },
   });

   const handleRegister = (name: string, email: string, password: string) => {
      const params = { name, email, password, url: BaseURL };
      console.log(email);
      addEmailToLS(email);
      registerMutate(params);
   };

   const checkEmailAvailable = (email: string) => {
      emailAvailableMutate(email);
   };

   return (
      <SignUpForm
         handleRegister={handleRegister}
         checkEmailAvailable={checkEmailAvailable}
         isLoading={isPending}
         emailLoading={emailLoading}
         emailSucces={isEmailAvailable}
      />
   );
};

export default SignUp;
