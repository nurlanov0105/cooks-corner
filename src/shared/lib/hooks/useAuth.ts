import { useAppSelector } from '@/app/appStore';

export function useAuth() {
   const { accessToken } = useAppSelector((state) => state.profile);

   return {
      isAuth: !!accessToken,
   };
}
