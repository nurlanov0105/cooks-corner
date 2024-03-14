import { SignUpForm } from '@/features/authentication';

const SignUp = () => {
   const handleRegister = (name: string, email: string, password: string) => {
      console.log(name, email, password);
   };
   return <SignUpForm handleRegister={handleRegister} isLoading={false} />;
};

export default SignUp;
