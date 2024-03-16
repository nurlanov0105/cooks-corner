import { useAppSelector } from '@/app/appStore';

import styles from './styles.module.scss';
import classNames from 'classnames';
import { ProfileInfo } from '@/widgets/profileInfo';
import { CardsSection } from '@/widgets/cardsSection';
import { useGetProfileRecipesQuery, useGetUserProfileQuery } from '@/entities/profile';
import { ProfileCategories } from '@/features/profileCategories';
import { useAuth } from '@/shared/lib/hooks';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
   const { isAuth } = useAuth();
   const navigate = useNavigate();

   if (!isAuth) {
      navigate('/');
      return;
   }

   const userObj: any = localStorage.getItem('currentUserId');
   const readyObj = JSON.parse(userObj);

   const { category, profileRecipes } = useAppSelector((state) => state.profile);

   const { data, isLoading, isError } = useGetUserProfileQuery({ userId: readyObj.userId });
   const { isLoading: recipeLoading } = useGetProfileRecipesQuery({ category });

   const preparedCards = recipeLoading ? [...Array(12)] : profileRecipes;

   return (
      <div className='container'>
         <h2 className={classNames('h2', styles.title)}>Profile</h2>

         <ProfileInfo {...data} isLoading={isLoading} isError={isError} />
         <div className={styles.categories}>
            <ProfileCategories />
         </div>

         <CardsSection cards={preparedCards} isLoading={recipeLoading} />
      </div>
   );
};

export default Profile;
