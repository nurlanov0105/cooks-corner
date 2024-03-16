import classNames from 'classnames';
import styles from './styles.module.scss';
import { useCallback } from 'react';
import { SearchCategories } from '@/features/searchCategories';
import { Search } from '@/features/search';
import { ChefsCard } from '@/features/chefsCard';
import { StandartCard } from '@/features/standartCard';
import { useAppDispatch, useAppSelector } from '@/app/appStore';
import {
   addSearchCategory,
   useGetSearchRecipesQuery,
   useSearchUsersQuery,
} from '@/entities/search';
import { AddRecipeBtn } from '@/entities/addRecipeBtn';
import { RecipeCardSkeleton } from '@/shared/ui';

const SearchPage = () => {
   const dispatch = useAppDispatch();
   const category = useAppSelector((state) => state.search.category);
   const {
      chefsSearchParams,
      recipesSearchParams,
      chefsPage,
      chefsLimit,
      recipesLimit,
      recipesPage,
      chefsCards,
      recipesCards,
   } = useAppSelector((state) => state.search);

   const { isLoading: chefsLoading } = useSearchUsersQuery({
      searchParams: chefsSearchParams,
      page: chefsPage,
      size: chefsLimit,
   });
   const { isLoading: recipesLoading } = useGetSearchRecipesQuery({
      searchParams: recipesSearchParams,
      size: recipesLimit,
      page: recipesPage,
   });

   const onClickCategory = useCallback((category: string) => {
      dispatch(addSearchCategory(category));
   }, []);

   const preparedChefsCards = chefsLoading
      ? [...Array(12)].map((_, i) => <RecipeCardSkeleton key={i} />)
      : chefsCards.map((data: any) => <ChefsCard {...data} key={data.userId} />);

   const preparedRecipesCards = recipesLoading
      ? [...Array(12)].map((_, i) => <RecipeCardSkeleton key={i} />)
      : recipesCards.map((data: any) => <StandartCard {...data} key={data.recipeId} />);

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
