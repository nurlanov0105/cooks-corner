import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/appStore';
import { SearchCategories } from '@/features/searchCategories';
import { Search } from '@/features/search';
import { ChefsCard } from '@/features/chefsCard';
import { StandartCard } from '@/features/standartCard';
import { RecipeCardSkeleton } from '@/shared/ui';
import { AddRecipeBtn } from '@/entities/addRecipeBtn';

import { addSearchCategory, searchRecipes, searchUsers } from '@/entities/search';

import classNames from 'classnames';
import styles from './styles.module.scss';
import { useQuery } from '@tanstack/react-query';
import { Tags } from '@/shared/api';

const SearchPage: FC = () => {
   const dispatch = useAppDispatch();

   const category = useAppSelector((state) => state.search.category);
   const {
      chefsSearchParams,
      chefsPage,
      chefsLimit,
      recipesSearchParams,
      recipesLimit,
      recipesPage,
      // chefsCards,
      // recipesCards,
   } = useAppSelector((state) => state.search);

   const { data: chefsCards, isLoading: chefsLoading } = useQuery({
      queryKey: [Tags.USERS, chefsSearchParams, chefsPage, chefsLimit],
      queryFn: () => searchUsers({ query: chefsSearchParams, size: chefsLimit, page: chefsPage }),
   });
   const { data: recipesCards, isLoading: recipesLoading } = useQuery({
      queryKey: [Tags.RECIPES, recipesSearchParams, recipesLimit, recipesPage],
      queryFn: () =>
         searchRecipes({ query: recipesSearchParams, size: recipesLimit, page: recipesPage }),
   });

   const onClickCategory = useCallback((category: string) => {
      dispatch(addSearchCategory(category));
   }, []);

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
            {category === 'Chefs' ? <Search type={category} /> : <Search type={category} />}
         </div>
         <p className={styles.search__result}>Search results</p>
         {/* <p className={styles.search__notfound}>No results found</p> */}

         {category === 'Chefs' ? (
            <>
               <div className={styles.search__section}>
                  <div className={styles.search__row}>{preparedChefsCards}</div>
               </div>
            </>
         ) : (
            <>
               <div className={styles.search__section}>
                  <div className={classNames(styles.search__row, styles.search__row_mt)}>
                     {preparedRecipesCards}
                  </div>
               </div>
            </>
         )}

         <div className={styles.search__btn}>
            <AddRecipeBtn />
         </div>
      </div>
   );
};

export default SearchPage;
