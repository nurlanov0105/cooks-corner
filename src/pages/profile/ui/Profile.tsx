import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/app/appStore';
import { useAuth } from '@/shared/lib/hooks';

import { ProfileInfo } from '@/widgets/profileInfo';
import { CardsSection } from '@/widgets/cardsSection';
import { ProfileCategories } from '@/features/profileCategories';

import classNames from 'classnames';
import styles from './styles.module.scss';
import { getProfileRecipes, getUser } from '@/entities/user';
import { Tags } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';

const Profile: FC = () => {
   const { isAuth } = useAuth();
   const navigate = useNavigate();

   if (!isAuth) {
      navigate('/');
      return;
   }

   const userObj: any = localStorage.getItem('currentUserId');
   const readyObj = JSON.parse(userObj);

   const { category } = useAppSelector((state) => state.user);

   const {
      data: userData,
      isLoading: userLoading,
      isError: userError,
   } = useQuery({
      queryKey: [Tags.USERS],
      queryFn: () => getUser(readyObj.userId),
   });

   const { data: profileRecipes, isLoading: recipeLoading } = useQuery({
      queryKey: [Tags.USERS, category],
      queryFn: () => getProfileRecipes(category),
   });

   const preparedCards = recipeLoading ? [...Array(12)] : profileRecipes.content;

   return (
      <div className='container'>
         <h2 className={classNames('h2', styles.title)}>Profile</h2>

         <ProfileInfo {...userData} isLoading={userLoading} isError={userError} />
         <div className={styles.categories}>
            <ProfileCategories />
         </div>

         <CardsSection cards={preparedCards} isLoading={recipeLoading} />
      </div>
   );
};

export default Profile;
