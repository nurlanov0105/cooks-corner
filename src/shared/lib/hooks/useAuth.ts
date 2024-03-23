import { useAppSelector } from '@/app/appStore';

export function useAuth() {
   const accessToken = useAppSelector((state) => state.auth.accessToken);

   return {
      isAuth: !!accessToken,
   };
}
