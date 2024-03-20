import { FC } from 'react';
import { Routes, Route } from 'react-router';

import { AuthLayout } from '../layouts';
import ProtectedRoute from './ProtectedRoute';

import { SignIn } from '@/pages/signin';
import { SignUp } from '@/pages/signup';
import { Home } from '@/pages/home';
import { Confirm } from '@/pages/confirm';
import { Author } from '@/pages/author';
import { Profile } from '@/pages/profile';
import { DetailsRecipe } from '@/pages/detailsRecipe';
import { NotFound } from '@/pages/notFound';
import { SearchPage } from '@/pages/searchPage';
import { Verification } from '@/pages/verification';
import { ForgotPassword } from '@/pages/forgotPassword';
import { ResetPassword } from '@/pages/resetPassword';
import { Modal } from '@/widgets/modal';

const Routers: FC = () => {
   return (
      <>
         <Routes>
            <Route path='/' element={<ProtectedRoute />}>
               <Route index element={<Home />} />
               <Route path='details-recipe/:id' element={<DetailsRecipe />} />
               <Route path='profile' element={<Profile />} />
               <Route path='authors/:id' element={<Author />} />
               <Route path='search' element={<SearchPage />} />
            </Route>

            <Route path='/' element={<AuthLayout />}>
               <Route path='signin' element={<SignIn />} />
               <Route path='signup' element={<SignUp />} />
               <Route path='confirm' element={<Confirm />} />
               <Route path='verification' element={<Verification />} />
               <Route path='forgot-password' element={<ForgotPassword />} />
               <Route path='reset-password' element={<ResetPassword />} />
            </Route>
            <Route path='*' element={<NotFound />} />
         </Routes>
         <Modal />
      </>
   );
};

export default Routers;
