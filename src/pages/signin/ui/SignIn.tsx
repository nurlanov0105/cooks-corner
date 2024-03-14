import { SignInForm } from '@/features/authentication';

const SignIn = () => {
   const handleLogin = (email: string, password: string) => {
      console.log(email, password);
   };
   return <SignInForm handleLogin={handleLogin} isLoading={false} />;
};

export default SignIn;
