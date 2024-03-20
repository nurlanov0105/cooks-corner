import { FC, useEffect } from 'react';
import { useAuth } from '@/shared/lib/hooks';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MainLayout } from '../layouts';
import { useAppDispatch, useAppSelector } from '../appStore';
import { showModal } from '@/widgets/modal';

const ProtectedRoute: FC = () => {
   const { isAuth } = useAuth();
   const pathname = useLocation().pathname;
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const isOpen = useAppSelector((state) => state.modal.isOpen);

   useEffect(() => {
      if (!isAuth && pathname === '/profile') {
         navigate('/');
         dispatch(showModal('NotAuthNotice'));
      }
   }, [isAuth, pathname, isOpen, dispatch]);

   return (
      <MainLayout>
         <Outlet />
      </MainLayout>
   );
};

export default ProtectedRoute;
