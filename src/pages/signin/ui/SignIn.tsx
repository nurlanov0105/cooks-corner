import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/appStore';
import { SignInForm, addAccessToken, addUserId, login } from '@/features/authentication';
import { addTokensToLS, addUserIdToLS } from '@/shared/lib/helpers';
import { useMutation } from '@tanstack/react-query';
import { ILoginRequest } from '@/shared/lib/types';
import { toast } from 'react-toastify';

const SignIn: FC = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const { mutate: loginMutate, isPending } = useMutation({
      mutationFn: (params: ILoginRequest) => login(params),
      onSuccess: (result: any) => {
         if (result.data) {
            console.log(result.data);
            localStorage.removeItem('currentEmail');
            addTokensToLS({
               accessToken: result.data.accessToken,
               refreshToken: result.data.refreshToken,
            });
            addUserIdToLS(result.data.userId);
            dispatch(addAccessToken(result.data.accessToken));
            dispatch(addUserId(result.data.userId));

            navigate('/');
            toast.success('Succesfully login!');
         }
      },
      onError: (result: any) => {
         console.log(result);
         // apiErrorMessages({ queryName: 'Login', error: result.error });
      },
   });

   const handleLogin = (email: string, password: string) => {
      loginMutate({ email, password });
   };

   return <SignInForm handleLogin={handleLogin} isLoading={isPending} />;
};

export default SignIn;
