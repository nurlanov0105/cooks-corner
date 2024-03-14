import { Routes, Route } from 'react-router';
import { AuthLayout, MainLayout } from '../layouts';

import { SignIn } from '@/pages/signin';
import { SignUp } from '@/pages/signup';
import { Home } from '@/pages/home';
import { Confirm } from '@/pages/confirm';
import { Author } from '@/pages/author';
import { Profile } from '@/pages/profile';
import { DetailsRecipe } from '@/pages/detailsRecipe';
import { NotFound } from '@/pages/notFound';
import { SearchPage } from '@/pages/searchPage';
import { Modal } from '@/widgets/modal';
import { Verification } from '@/pages/verification';
import { ForgotPassword } from '@/pages/forgotPassword';
import { ResetPassword } from '@/pages/resetPassword';

const Routers = () => {
   return (
      <>
         <Routes>
            <Route path='/' element={<MainLayout />}>
               <Route index element={<Home />} />
               <Route path='details-recipe/:id' element={<DetailsRecipe />} />
               <Route path='authors/:id' element={<Author />} />
               <Route path='profile' element={<Profile />} />
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
