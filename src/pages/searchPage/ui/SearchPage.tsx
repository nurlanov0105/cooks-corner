import { FC, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/appStore';
import { SearchCategories } from '@/features/searchCategories';
import { Search } from '@/features/search';
import { ChefsCard } from '@/features/chefsCard';
import { StandartCard } from '@/features/standartCard';
import { RecipeCardSkeleton } from '@/shared/ui';
import { AddRecipeBtn } from '@/entities/addRecipeBtn';

import {
   addChefsTotalPages,
   addRecipesTotalPages,
   addSearchCategory,
   searchRecipes,
   searchUsers,
   setChefsPage,
   setRecipesPage,
} from '@/entities/search';

import classNames from 'classnames';
import styles from './styles.module.scss';
import { useQuery } from '@tanstack/react-query';
import { Tags } from '@/shared/api';
import { Pagaination } from '@/features/pagination';

const SearchPage: FC = () => {
   const dispatch = useAppDispatch();
   const category = useAppSelector((state) => state.search.category);
   const {
      chefsSearchParams,
      chefsPage,
      chefsLimit,
      chefsTotalPages,
      recipesSearchParams,
      recipesLimit,
      recipesPage,
      recipesTotalPages,
   } = useAppSelector((state) => state.search);

   const {
      data: chefsCards,
      isLoading: chefsLoading,
      isSuccess: chefsSuccess,
   } = useQuery({
      queryKey: [Tags.USERS, chefsSearchParams, chefsPage, chefsLimit],
      queryFn: () => searchUsers({ query: chefsSearchParams, size: chefsLimit, page: chefsPage }),
   });
   const {
      data: recipesCards,
      isLoading: recipesLoading,
      isSuccess: recipesSuccess,
   } = useQuery({
      queryKey: [Tags.RECIPES, recipesSearchParams, recipesLimit, recipesPage],
      queryFn: () =>
         searchRecipes({ query: recipesSearchParams, size: recipesLimit, page: recipesPage }),
   });

   const onClickCategory = useCallback((category: string) => {
      dispatch(addSearchCategory(category));
   }, []);

   const onChangeChefsPage = (num: number) => {
      dispatch(setChefsPage(num));
   };
   const onChangeRecipesPage = (num: number) => {
      dispatch(setRecipesPage(num));
   };

   useEffect(() => {
      if (chefsSuccess) {
         dispatch(addChefsTotalPages(chefsCards.totalPages));
      }
   }, [chefsSuccess]);

   useEffect(() => {
      if (recipesSuccess) {
         dispatch(addRecipesTotalPages(recipesCards.totalPages));
      }
   }, [recipesSuccess]);

   const preparedChefsCards = chefsLoading
      ? [...Array(12)].map((_, i) => <RecipeCardSkeleton key={i} />)
      : chefsCards.content.map((data: any) => <ChefsCard {...data} key={data.userId} />);

   const preparedRecipesCards = recipesLoading
      ? [...Array(12)].map((_, i) => <RecipeCardSkeleton key={i} />)
      : recipesCards.content.map((data: any) => <StandartCard {...data} key={data.recipeId} />);

   return (
      <div className={classNames('container', styles.search)}>
         <h2 className={classNames('h2', styles.search__title)}>What to eat today?</h2>
         <div className={styles.search__category}>
            <SearchCategories value={category} onClickCategory={onClickCategory} />
         </div>

         <div className={styles.search__input}>
            <Search type={category} />
         </div>
         <p className={styles.search__result}>Search results</p>

         {category === 'Chefs' && chefsCards?.content.length === 0 && (
            <p className={styles.search__notfound}>No results found</p>
         )}
         {category !== 'Chefs' && recipesCards?.content.length === 0 && (
            <p className={styles.search__notfound}>No results found</p>
         )}
         {category === 'Chefs' && chefsLoading && <div className='infiniteLoader'></div>}
         {category !== 'Chefs' && recipesLoading && <div className='infiniteLoader'></div>}

         {category === 'Chefs'
            ? !chefsLoading && (
                 <>
                    <div className={styles.search__section}>
                       <div className={styles.search__row}>{preparedChefsCards}</div>
                    </div>
                 </>
              )
            : !recipesLoading && (
                 <>
                    <div className={styles.search__section}>
                       <div className={classNames(styles.search__row, styles.search__row_mt)}>
                          {preparedRecipesCards}
                       </div>
                    </div>
                 </>
              )}

         <div className={styles.search__bottom}>
            {category === 'Chefs' ? (
               <Pagaination
                  currentPage={chefsPage}
                  onChangePages={(num: number) => onChangeChefsPage(num)}
                  totalPages={chefsTotalPages}
               />
            ) : (
               <Pagaination
                  currentPage={recipesPage}
                  onChangePages={(num: number) => onChangeRecipesPage(num)}
                  totalPages={recipesTotalPages}
               />
            )}

            <div className={styles.search__btn}>
               <AddRecipeBtn />
            </div>
         </div>
      </div>
   );
};

export default SearchPage;
