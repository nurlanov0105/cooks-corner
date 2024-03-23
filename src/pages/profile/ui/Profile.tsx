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

const Profile: FC = () => {
   const { isAuth } = useAuth();
   const navigate = useNavigate();

   if (!isAuth) {
      navigate('/');
      return;
   }

   const dispatch = useAppDispatch();
   const userObj: any = localStorage.getItem('currentUserId');
   const readyObj = JSON.parse(userObj);

   // const [profileRecipes, setProfileRecipes] = useState<any[]>([]);
   const { profileRecipes, category, currentPage, limit } = useAppSelector((state) => state.user);
   const [isLoading, setIsLoading] = useState(true);

   const {
      data: userData,
      isLoading: userLoading,
      isError: userError,
   } = useQuery({
      queryKey: [Tags.USERS],
      queryFn: () => getUser(readyObj.userId),
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

   // const {
   //    data: newProfileRecipes,
   //    isLoading: recipeLoading,
   //    isSuccess,
   // } = useQuery({
   //    queryKey: [Tags.USERS, activeCategory, currentPage],
   //    queryFn: () =>
   //       getProfileRecipes({ category: activeCategory, page: currentPage, size: limit }),
   // });

   // useEffect(() => {
   //    if (isSuccess) {
   //       setProfileRecipes((oldData) => [...oldData, ...newProfileRecipes.content]);
   //    }
   // }, [isSuccess]);

   return (
      <div className='container'>
         <h2 className={classNames('h2', styles.title)}>Profile</h2>

         <ProfileInfo
            {...userData}
            isLoading={userLoading}
            isError={userError}
            userId={readyObj.userId}
         />
         <div className={styles.categories}>
            <ProfileCategories value={category} onClickCategory={onClickCategory} />
         </div>

         <CardsSection cards={profileRecipes} isLoading={isLoading} isProfile={true} />
         {isLoading ? <div className='infiniteLoader'></div> : ''}
      </div>
   );
};

export default Profile;
