import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/appStore';
import { useAuth } from '@/shared/lib/hooks';

import { ProfileInfo } from '@/widgets/profileInfo';
import { CardsSection } from '@/widgets/cardsSection';
import { ProfileCategories } from '@/features/profileCategories';

import classNames from 'classnames';
import styles from './styles.module.scss';
import {
   addProfileCategory,
   getProfileRecipes,
   getUser,
   setCurrentPage,
   setProfileRecipes,
} from '@/entities/user';

import { Tags } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import { getUserInfoFomLS } from '@/shared/lib/helpers';
import { closeMobileModal } from '@/widgets/mobileModal';
import { showModal } from '@/widgets/modal';

const Profile: FC = () => {
   const { isAuth } = useAuth();
   const navigate = useNavigate();

   if (!isAuth) {
      navigate('/');
      return;
   }

   const dispatch = useAppDispatch();
   const { userId } = getUserInfoFomLS();

   const { profileRecipes, category, currentPage, limit } = useAppSelector((state) => state.user);
   const [isLoading, setIsLoading] = useState(true);

   const {
      data: userData,
      isLoading: userLoading,
      isError: userError,
   } = useQuery({
      queryKey: [Tags.USERS],
      queryFn: () => getUser(userId),
   });

   useEffect(() => {
      const fetchData = async () => {
         try {
            setIsLoading(true);
            const response = await getProfileRecipes({
               category: category,
               page: currentPage,
               size: limit,
            });
            setIsLoading(false);

            // Удаление дубликатов
            const uniqueRecipes = response.content.filter(
               (recipe: any) =>
                  !profileRecipes.find(
                     // @ts-ignore
                     (existingRecipe) => existingRecipe.recipeId === recipe.recipeId
                  )
            );

            dispatch(setProfileRecipes([...profileRecipes, ...uniqueRecipes]));
         } catch (error) {
            console.error('Error fetching data: ', error);
         }
      };

      fetchData();
   }, [category, currentPage, limit]);

   const onClickCategory = (category: string) => {
      dispatch(addProfileCategory(category));

      dispatch(setProfileRecipes([]));
      dispatch(setCurrentPage(0));
   };

   const onLogoutClick = () => {
      dispatch(closeMobileModal());
      dispatch(showModal('LogoutModal'));
   };
   const onDeleteClick = () => {
      dispatch(closeMobileModal());
      dispatch(showModal('DeleteAccountModal'));
   };

   return (
      <div className={classNames('container', styles.section)}>
         <div className={styles.section__top}>
            <h2 className={classNames('h2', styles.title)}>Profile</h2>
            <div className={styles.navbar}>
               {isAuth && (
                  <>
                     <button
                        className={classNames(styles.navbar__btn, styles.navbar__logout)}
                        onClick={onLogoutClick}>
                        <svg>
                           <path d='M5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z' />
                        </svg>
                     </button>
                     <button className={classNames(styles.navbar__btn)} onClick={onDeleteClick}>
                        <svg viewBox='0 0 490.646 490.646'>
                           <g>
                              <path
                                 d='M399.179,67.285l-74.794,0.033L324.356,0L166.214,0.066l0.029,67.318l-74.802,0.033l0.025,62.914h307.739L399.179,67.285z
			                           M198.28,32.11l94.03-0.041l0.017,35.262l-94.03,0.041L198.28,32.11z'
                              />
                              <path
                                 d='M91.465,490.646h307.739V146.359H91.465V490.646z M317.461,193.372h16.028v250.259h-16.028V193.372L317.461,193.372z
			                            M237.321,193.372h16.028v250.259h-16.028V193.372L237.321,193.372z M157.18,193.372h16.028v250.259H157.18V193.372z'
                              />
                           </g>
                        </svg>
                     </button>
                  </>
               )}
            </div>
         </div>

         <ProfileInfo {...userData} isLoading={userLoading} isError={userError} userId={userId} />
         <div className={styles.categories}>
            <ProfileCategories value={category} onClickCategory={onClickCategory} />
         </div>

         <CardsSection cards={profileRecipes} isLoading={isLoading} isProfile={true} />
         {isLoading ? <div className='infiniteLoader'></div> : ''}
      </div>
   );
};

export default Profile;
