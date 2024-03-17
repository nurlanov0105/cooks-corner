import { useAppSelector } from '@/app/appStore';

export function useAuth() {
   const userId = useAppSelector((state) => state.auth.userId);

   return {
      isAuth: !!userId,
   };
}
