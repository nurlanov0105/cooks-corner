import { useAuth } from '@/shared/lib/hooks';
import { Outlet, useLocation } from 'react-router-dom';
import { MainLayout } from '../layouts';
import { useAppDispatch, useAppSelector } from '../appStore';
import { ModalBlur, closeModalBlur, showModalBlur } from '@/widgets/modalBlur';
import { useEffect } from 'react';

const ProtectedRoute = () => {
   const { isAuth } = useAuth();
   const pathname = useLocation().pathname;
   const dispatch = useAppDispatch();
   const isOpen = useAppSelector((state) => state.modalBlur.isOpen);

   useEffect(() => {
      if (!isAuth && pathname === '/profile') {
         dispatch(showModalBlur('NotAuthNotice'));
      } else if (isOpen) {
         dispatch(closeModalBlur());
      }
   }, [isAuth, pathname, isOpen, dispatch]);

   return (
      <>
         <MainLayout>
            <Outlet />
         </MainLayout>
         <ModalBlur />
      </>
   );
};

export default ProtectedRoute;
