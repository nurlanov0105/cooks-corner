import { useAuth } from '@/shared/lib/hooks';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MainLayout } from '../layouts';
import { useAppDispatch, useAppSelector } from '../appStore';
import { ModalBlur } from '@/widgets/modalBlur';
import { useEffect } from 'react';
import { closeModal, showModal } from '@/widgets/modal';

const ProtectedRoute = () => {
   const { isAuth } = useAuth();
   const pathname = useLocation().pathname;
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const isOpen = useAppSelector((state) => state.modalBlur.isOpen);

   useEffect(() => {
      if (!isAuth && pathname === '/profile') {
         navigate('/');
         dispatch(showModal('NotAuthNotice'));
      } else if (isOpen) {
         dispatch(closeModal());
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
